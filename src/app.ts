import express, { Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import compression from "compression";
import http from 'http';

import * as routes from './routes';
import { middleware } from './middlewares/routeMiddleware/middleware';

/**
 * @class Server
 * creates express app with http server
 * includes configurations for the server.
 */

class Server {
    private app: Express;
    private port: string | number = process.env.PORT || "8080";

    constructor() {
        this.app = express();
        this.configureServer();
        this.setupRoutes();
        this.listenServer();
    }

    /**
     * @function configureServer
     * configures express app, i.e., cors, request format, 
     * compression - compresses the request and response object.
     */

    configureServer() {
        this.app.use(compression())
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Access-Control-Allow-Headers', "Content-Type, Content-Length");
            res.header("Access-Control-Allow-Credentials", "true");

            //intercept OPTIONS method
            if ('OPTIONS' === req.method) {
                // respond with 200
                res.sendStatus(200);
            } else {
                // move on
                next();
            }
        });
    }

    /**
     * @function setupRoutes
     */

    setupRoutes() {
        this.app.use('/protected', middleware, routes.protectedRoutes);
        this.app.use('/unprotected', routes.unProtectedRoutes);
        this.app.use('/', (req: Request, res: Response) => {
            res.send('server is running')
        });
    }

    /**
     * @function listenServer
     * Creates http server with express app.
     */

    listenServer() {
        http.createServer(this.app).listen(this.port, () => {
            console.log("listening to port");
        })
    }

}

const app = new Server();

export { app }