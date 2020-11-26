import { createUser, deleteUser, getAutoSuggestUsers, getUser, updateUser } from '../controllers/user.controller';
import { queryAutoSuggestSchema, paramsSchema, schema, validateSchema, schemaOptionalParams } from '../validators/user.validators';
import { Application } from 'express';
import { ContentRequestType } from '../../models/response.type';
import { checkToken } from "../middleware/jwt.middleware";
import { loggingError } from "../middleware/logging.middleware";

const userRoutes = (app: Application): void => {
    app.route('/user')
        .get(
            validateSchema(queryAutoSuggestSchema, ContentRequestType.Query),
            checkToken,
            getAutoSuggestUsers,
            loggingError
        )
        .post(
            validateSchema(schema, ContentRequestType.Body),
            checkToken,
            createUser,
            loggingError
        );

    app.route('/user/:id')
        .get(
            validateSchema(paramsSchema, ContentRequestType.Params),
            checkToken,
            getUser,
            loggingError
        ).put(
            validateSchema(paramsSchema, ContentRequestType.Params),
            validateSchema(schemaOptionalParams, ContentRequestType.Body),
            checkToken,
            updateUser,
            loggingError
        ).delete(
            validateSchema(paramsSchema, ContentRequestType.Params),
            checkToken,
            deleteUser,
            loggingError
        );
};

export default userRoutes;