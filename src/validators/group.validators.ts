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
import { Permission } from "../../models/group.type";

createValidator({ passError: true });

export const groupSchema = Joi.object({
    name: Joi.string().alphanum().required(),
    permission: Joi.string().regex(/(WRITE|READ|DELETE|SHARE|UPLOAD_FILES)/).required()
});

export const groupSchemaOptionalParams = Joi.object({
    name: Joi.string().alphanum(),
    permission: Joi.string().regex(/(WRITE|READ|DELETE|SHARE|UPLOAD_FILES)/)
});

export interface GroupCreateRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id?: string;
        name: string;
        permission: Permission[];
    }
}

export interface GroupUpdateRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        name?: string;
        permission?: Permission[];
    }
}

export const groupParamsSchema = Joi.object({
    id: Joi.string().required()
});

export interface GroupParamsSchema extends ValidatedRequestSchema {
    [ContainerTypes.Params]: {
        id: string;
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

export const validateGroupSchema = (validatedSchema: AnySchema, type: ContentRequestType): any => {
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
