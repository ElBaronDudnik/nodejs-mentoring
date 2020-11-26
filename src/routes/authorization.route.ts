import { Application }  from "express";
import { login } from "../controllers/authorization.controller";

const authorizationRoute = (app: Application): void => {
    app.route('/authenticate')
        .post(login)
};

export default authorizationRoute;