import { config } from "../../config.js";
import { connectionUrl } from "./getConnection.js";

export const analyticsData = async () => {
    let client
    try {

        const leaderBoardPipeline = [
            {
                $unwind: "$addedKudos" // Unwind the addedKudos array
            },
            {
                $match: {
                    "addedKudos.createdOn": { $exists: true, $ne: null } // Ensure createdOn exists and is not null
                }
            },
            {
                $group: {
                    _id: "$addedKudos.recipient", // Group by the recipient field in the addedKudos array
                    count: { $sum: 1 } // Count the occurrences for each recipient
                }
            },
            {
                $project: {
                    recipient: "$_id", // Rename _id to recipient for output clarity
                    count: 1, // Include the count field
                    _id: 0 // Exclude the _id field from the output
                }
            },
            {
                $sort: { count: -1 } // Sort by count in descending order
            }
        ];

        const badgesPipeline = [
            {
                $unwind: "$addedKudos"
            },
            {
                $match: {
                    "addedKudos.createdOn": { $exists: true, $ne: null } // Ensure createdOn exists and is not null
                }
            },
            {
                $group: {
                    _id: "$addedKudos.badge", // Group by the badge field in the addedKudos array
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    badge: "$_id", // Rename _id to badge for output clarity
                    count: 1,  // Include the count field
                    _id: 0  // Exclude the _id field from the output
                }
            }
        ]

        client = await connectionUrl()
        const database = client.db(config.MONGO_CONFIG.MONGO_DB_NAME)
        const kudosCollection = database.collection(config.COLLECTION_NAMES_CONFIG.KUDOS_COLLECTION)

        const [userData, badgeData] = await Promise.all(
            [
                kudosCollection
                    .aggregate(leaderBoardPipeline, { maxTimeMS: 25_000 })
                    .toArray(),
                kudosCollection
                    .aggregate(badgesPipeline, { maxTimeMS: 25_000 })
                    .toArray()
            ]
        )
        const analyticsData = {
            userData: userData,
            labels: badgeData
        }

        return analyticsData

    } catch (error) {
        throw new Error(error)
    } finally {
        if (client) await client.close()
    }
}