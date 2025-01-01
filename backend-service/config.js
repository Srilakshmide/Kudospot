// Import the 'dotenv' package using CommonJS syntax
import dotenv from 'dotenv';

dotenv.config();

const config = {
    SERVER_CONFIG: {
        LISTEN_PORT: 8080,
        LISTEN_HOST: "0.0.0.0",
        RUNNING_ENV: process.env.RUNNING_ENV,
    },
    MONGO_CONFIG: {
        MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
        MONGO_DB_NAME: process.env.DB_NAME
    },
    COLLECTION_NAMES_CONFIG: {
        KUDOS_COLLECTION: process.env.KUDOS_COLLECTION,
        EMPLOYEE_COLLECTION: process.env.EMPLOYEE_COLLECTION
    }
};

export { config };

// // Use '__dirname' to get the current directory path
// const directoryPath = __dirname;

// // Configure 'dotenv' to load environment variables from '.env' file in the current directory
// DotEnv.config({ path: `${directoryPath}/.env` });

// Export the configuration object
/**
 * Configuration object containing various settings and environment variables.
 */