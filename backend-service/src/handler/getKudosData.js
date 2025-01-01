import { config } from "../../config.js"
import { connectionUrl } from "./getConnection.js"

export const getKudosData = async (request) => {
    let client
    try {
        client = await connectionUrl()
        const kudosData = [];

        const database = client.db(config.MONGO_CONFIG.MONGO_DB_NAME)
        const kudosCollection = database.collection(config.COLLECTION_NAMES_CONFIG.KUDOS_COLLECTION)

        const data = await kudosCollection.find().sort({ createdOn: -1 }).toArray()
        for (const eachUser of data) {
            if (eachUser?.addedKudos?.length > 0) {
                eachUser.addedKudos = eachUser.addedKudos.map((eachMsg) => {
                    return { ...eachMsg, userName: eachUser.userName };
                })
                kudosData.push(...eachUser.addedKudos)
            }
        }
        return kudosData;

    } catch (error) {
        throw new Error(error)
    } finally {
        if (client) await client.close()
    }
}