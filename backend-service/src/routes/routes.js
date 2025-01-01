import { addUserKudos } from "../handler/addKudos.js";
import { checkUserExist } from "../handler/checkUser.js";
import { analyticsData } from "../handler/getAnalytics.js";
import { getKudosData } from "../handler/getKudosData.js";

export const userKudos = {
    addKudos: {
        handler: async (request, handlerRes) => {
            try {
                // Get payload from request
                const payload = request.payload
                const result = await addUserKudos(payload)
                // Return the response
                return result;
            } catch (error) {
                // Return the error response.
                return handlerRes.response({ cause: `${error.message ? error.message : 'Not mentioned..!'}`, error: 'An error occurred. Unable add kudos data to the MongoDB..!' }).code(500);
            }
        },
        method: 'POST',
        options: {
            tags: ['api', 'add-kudos'],
            description: 'add user kudos data',
            notes: 'Adding user kudos data to the MongoDB'
        },
        path: '/add-kudos'
    },

    getKudosData: {
        handler: async (request, handlerRes) => {
            try {
                const result = await getKudosData(request)
                // Return the response
                return result;

            } catch (error) {
                // Return the error response.
                return handlerRes.response({ cause: `${error.message ? error.message : 'Not mentioned..!'}`, error: 'An error occurred. Unable get the kudos data..!' }).code(500);
            }
        },
        method: 'GET',
        options: {
            tags: ['api', 'get-kudos-data'],
            description: 'get kudos data',
            notes: 'Getting kudos data from the MongoDB'
        },
        path: '/get-kudos-data'
    },

    checkUser: {
        handler: async (request, handlerRes) => {
            try {
                // Extract query from request
                const email = request.query.email
                const result = await checkUserExist(email)
                // Return the response
                return result;

            } catch (error) {
                // Return the error response.
                return handlerRes.response({ cause: `${error.message ? error.message : 'Not mentioned..!'}`, error: 'An error occurred. Unable check the user existence..!' }).code(500);
            }
        },
        method: 'GET',
        options: {
            tags: ['api', 'check-user'],
            description: 'check user existence',
            notes: 'Check the user existence in the MongoDB'
        },
        path: '/check-user'
    },

    getAnalytics: {
        handler: async (request, handlerRes) => {
            try {
                const result = await analyticsData()
                // Return the response
                return result;

            } catch (error) {
                // Return the error response.
                return handlerRes.response({ cause: `${error.message ? error.message : 'Not mentioned..!'}`, error: 'An error occurred. Unable get kudos analytics data..!' }).code(500);
            }
        },
        method: 'GET',
        options: {
            tags: ['api', 'get-analytics-data'],
            description: 'get analytics data of the kudos',
            notes: 'Getting kudos and user data from the MongoDB'
        },
        path: '/get-analytics-data'
    }
}