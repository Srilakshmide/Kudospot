import { MongoClient } from "mongodb"
import { config } from "../../config.js"

export const connectionUrl = async () => {
    let client
    try {
        // Create a new MongoClient instance
        client = new MongoClient(config.MONGO_CONFIG.MONGO_CONNECTION_STRING)
        // Connect to the MongoDB server
        await client.connect()
        console.log("Connected to MongoDB")

        return client
    } catch (error) {
        throw new Error(error)
    }
}