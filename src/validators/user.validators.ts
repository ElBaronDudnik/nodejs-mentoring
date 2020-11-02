import * as Joi from '@hapi/joi';
import {
    ContainerTypes,
    createValidator,
    ValidatedRequestSchema
} from 'express-joi-validation';
import { AnySchema } from '@hapi/joi';
import { ValidationErrorItem } from '@hapi/joi';
import { ContentRequestType } from '../../models/response.type';
import { IErrors } from '../../models/error.model';
import { logger } from "../logger";

createValidator({ passError: true });

export const schema = Joi.object({
    login: Joi.string().alphanum().required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean()
});

export const schemaOptionalParams = Joi.object({
    login: Joi.string().alphanum(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    age: Joi.number().min(4).max(130),
    isDeleted: Joi.boolean()
});

export interface UserCreateRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        login: string;
        password: string;
        age: number;
        isDeleted: boolean;
    }
}

export interface UserUpdateRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        login?: string;
        password?: string;
        age?: number;
        isDeleted?: boolean;
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

export const errorResponse = (schemaErrors: ValidationErrorItem[]): IErrors => {
    const errors = schemaErrors.map((error: ValidationErrorItem) => {
        const { path, message } = error;
        return { path, message };
    });
    return {
        status: 'Bad request',
        errors
    };
};

export const validateSchema = (validatedSchema: AnySchema, type: ContentRequestType): any => {
    return (req, res, next) => {
        const { error } = validatedSchema.validate(req[type], {
            abortEarly: false,
            allowUnknown: false
        });

        if (error && error.isJoi) {
            logger.log({ level: 'error', message: ' User validation error'});
            res.status(400).json(errorResponse(error.details));
        } else {
            return next();
        }
    };
};
