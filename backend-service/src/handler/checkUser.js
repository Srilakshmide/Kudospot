import { config } from '../../config.js';
import { connectionUrl } from './getConnection.js';

export const checkUserExist = async (email) => {
    let client
    try {
        client = await connectionUrl()
        const database = client.db(config.MONGO_CONFIG.MONGO_DB_NAME)
        const employCollection = database.collection(config.COLLECTION_NAMES_CONFIG.EMPLOYEE_COLLECTION)

        const filter = { "email": { $regex: new RegExp(`^${email}$`, 'i') } }
        const data = await employCollection.find(filter).toArray(); // for getting the count
        return { count: data?.length };

    } catch (error) {
        throw new Error(error)
    } finally {
        if (client) await client.close()
    }
}