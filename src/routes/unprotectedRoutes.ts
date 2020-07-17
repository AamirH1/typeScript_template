import express, { Router, Request, Response } from 'express';

export class UnprotectedRoutes {
    private route: Router = express.Router();
    public static instance: Router;

    constructor() {
    }

    private mountRoutes() {
        this.route.get("/get", (req: Request, res: Response) => {
            res.send("unprotected /get route");
        });
        return this.route;
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new UnprotectedRoutes().mountRoutes();
        return this.instance;
    }
}


const unProtectedRoutes = UnprotectedRoutes.getInstance();

export { unProtectedRoutes }