import * as Joi from '@hapi/joi';
import {
    ContainerTypes,
    createValidator,
    ValidatedRequestSchema
} from 'express-joi-validation';

export const validators = createValidator({
    passError: true
});

export const schema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().alphanum().required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean()
});

export interface UserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        login: string;
        password: string;
        age: number;
        isDeleted: boolean;
    }
}

export const paramsSchema = Joi.object({
    id: Joi.string().required()
});

export interface UserParamsSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
    }
}

export const queryAutoSuggestSchema = Joi.object({
    substring: Joi.string().required(),
    limit: Joi.number().min(1).max(100).required()
});

export interface UserAutoSuggestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        substring: string;
        limit: number;
    }
}
