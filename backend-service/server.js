import Hapi from '@hapi/hapi';
import { config } from './config.js';
import { userKudos } from './src/routes/routes.js';
import cors from 'cors'

const init = async () => {

    const server = Hapi.server({
        port: config.SERVER_CONFIG.LISTEN_PORT,
        host: config.SERVER_CONFIG.LISTEN_HOST,
        routes: {
            cors: {
                origin: ['*'], // Allow all origins
                additionalHeaders: ['service']
                // headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'], // Allowed headers
                // exposedHeaders: ['WWW-Authenticate', 'Server-Authorization'], // Exposed headers
                // credentials: true, // Allow cookies
            },
        },
    });

    // Register routes
    server.route(userKudos.addKudos);
    server.route(userKudos.getKudosData);
    server.route(userKudos.checkUser);
    server.route(userKudos.getAnalytics);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (errorMessage) => {
    console.error(errorMessage);
    process.exit(1);
});

init();