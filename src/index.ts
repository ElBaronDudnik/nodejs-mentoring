import express from 'express';
import * as bodyParser from 'body-parser';
import userRoutes from "./routes/user.routes";
import groupRoutes from "./routes/group.routes";
import authorizationRoute from './routes/authorization.route';
import * as cors from 'cors';
import { logger } from "./logger";

const app = express();
const port = 3700;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

userRoutes(app);
groupRoutes(app);
authorizationRoute(app);

process.on('uncaughtException', (err) => {
    logger.log({level: 'error', message: `${err}`});
});

process.on('unhandledRejection', (err) => {
    logger.log({level: 'error', message: `${err}`});
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
