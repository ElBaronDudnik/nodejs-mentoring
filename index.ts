import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './src/routes';

const app = express();
const port = 3700;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

app.listen(port, () => console.log(`App listening on port ${port}!`));
