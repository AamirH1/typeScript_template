import express, { Router, Request, Response } from 'express';

class ProtectedRoutes {
    private route: Router = express.Router();
    public static instance: Router;

    constructor() {
        this.mountRoutes();
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
        this.instance = new ProtectedRoutes().mountRoutes();
        return this.instance;
    }
}

const protectedRoutes = ProtectedRoutes.getInstance();

export { protectedRoutes }