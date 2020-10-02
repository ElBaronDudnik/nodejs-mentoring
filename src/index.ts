import express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes/routes';

const app = express();
const port = 3700;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

app.listen(port, () => console.log(`App listening on port ${port}!`));
