import { createUser, deleteUser, getAutoSuggestUsers, getUser, updateUser } from './controller';
import { queryAutoSuggestSchema, paramsSchema, schema } from './validators';
import { AnySchema } from '@hapi/joi';
import { ValidationErrorItem } from '@hapi/joi';
import { Application } from 'express';

enum ContentType {
    Body = 'body',
    Params = 'params',
    Query = 'query'
}

const errorResponse = (schemaErrors: ValidationErrorItem[]) => {
    const errors = schemaErrors.map((error: ValidationErrorItem) => {
        const { path, message } = error;
        return { path, message };
    });
    return {
        status: 'Bad request',
        errors
    };
};

const validateSchema = (validatedSchema: AnySchema, type: ContentType) => {
    return (req, res, next) => {
        const { error } = validatedSchema.validate(req[type], {
            abortEarly: false,
            allowUnknown: false
        });

        if (error && error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            return next();
        }
    };
};


const routes = (app: Application): void => {
    app.route('/user')
        .get(validateSchema(queryAutoSuggestSchema, ContentType.Query), getAutoSuggestUsers)
        .post(validateSchema(schema, ContentType.Body), createUser);

    app.route('/user/:id')
        .get(validateSchema(paramsSchema, ContentType.Params), getUser)
        .put(validateSchema(paramsSchema, ContentType.Params), validateSchema(schema, ContentType.Body), updateUser)
        .delete(validateSchema(paramsSchema, ContentType.Params), deleteUser);
};

export default routes;
