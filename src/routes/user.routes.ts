import { createUser, deleteUser, getAutoSuggestUsers, getUser, updateUser } from '../controllers/user.controller';
import { queryAutoSuggestSchema, paramsSchema, schema, validateSchema, schemaOptionalParams } from '../validators/user.validators';
import { Application } from 'express';
import { ContentRequestType } from '../../models/response.type';

const userRoutes = (app: Application): void => {
    app.route('/user')
        .get(validateSchema(queryAutoSuggestSchema, ContentRequestType.Query), getAutoSuggestUsers)
        .post(validateSchema(schema, ContentRequestType.Body), createUser);

    app.route('/user/:id')
        .get(validateSchema(paramsSchema, ContentRequestType.Params), getUser)
        .put(validateSchema(paramsSchema, ContentRequestType.Params), validateSchema(schemaOptionalParams, ContentRequestType.Body), updateUser)
        .delete(validateSchema(paramsSchema, ContentRequestType.Params), deleteUser);
};

export default userRoutes;
