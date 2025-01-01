import { config } from '../../config.js';
import { connectionUrl } from './getConnection.js';

export const addUserKudos = async (payload) => {
    let client
    try {
        payload.createdOn = payload?.createdOn ? new Date(payload.createdOn) : new Date()
        const userName = payload?.userName
        delete payload?.userName
        let addUserData;

        client = await connectionUrl()
        const database = client.db(config.MONGO_CONFIG.MONGO_DB_NAME)
        const kudosCollection = database.collection(config.COLLECTION_NAMES_CONFIG.KUDOS_COLLECTION)

        const isUserExist = await kudosCollection.find({ userName: userName }).project({ userName: 1 }).toArray()

        if (isUserExist?.length > 0) {
            payload?.noOfLikes ?
                addUserData = await kudosCollection.updateOne(
                    { "userName": userName, "addedKudos.recipient": payload.recipient }, // filter
                    { $set: { "addedKudos.$[elem]": payload } }, // Update the matching item in the array
                    {
                        upsert: true, // Ensure document creation if it doesn't exist
                        arrayFilters: [{ "elem.recipient": payload.recipient }]  // Use arrayFilters only for update
                    }
                ) :
                addUserData = await kudosCollection.updateOne(
                    {
                        userName: userName,
                        "addedKudos.recipient": { $ne: payload.recipient }
                    },
                    {
                        $push: {
                            addedKudos: {
                                recipient: payload.recipient,
                                badge: payload.badge,
                                message: payload.message,
                                createdOn: payload.createdOn
                            }
                        }
                    }
                );

        } else {
            addUserData = await kudosCollection.insertOne(
                {
                    userName: userName,
                    addedKudos: [
                        payload
                    ]
                }
            );
        }
        return addUserData

    } catch (error) {
        throw new Error(error)
    } finally {
        if (client) await client.close();
    }

}
