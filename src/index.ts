import express from 'express';
import * as bodyParser from 'body-parser';
import userRoutes from "./routes/user.routes";
import groupRoutes from "./routes/group.routes";

const app = express();
const port = 3700;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

userRoutes(app);
groupRoutes(app);

app.listen(port, () => console.log(`App listening on port ${port}!`));
