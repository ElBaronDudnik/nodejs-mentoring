import {
    createGroup,
    deleteGroup,
    getAllGroups,
    getGroupById,
    updateGroup
} from "../controllers/group.controller";
import {
    groupParamsSchema,
    groupSchema,
    groupSchemaOptionalParams,
    validateGroupSchema
} from "../validators/group.validators";
import { Application } from "express";
import { ContentRequestType } from "../../models/response.type";
import {loggingError} from "../middleware/logging.middleware";

const groupRoutes = (app: Application): void => {
    app.route('/group')
        .get(
            getAllGroups,
            loggingError
        )
        .post(
            validateGroupSchema(groupSchema,ContentRequestType.Body),
            createGroup,
            loggingError
        );

    app.route('/group/:id')
        .get(
            validateGroupSchema(groupParamsSchema, ContentRequestType.Params),
            getGroupById,
            loggingError
        )
        .put(
            validateGroupSchema(groupParamsSchema, ContentRequestType.Params),
            validateGroupSchema(groupSchemaOptionalParams, ContentRequestType.Body),
            updateGroup,
            loggingError
        )
        .delete(
            validateGroupSchema(groupParamsSchema, ContentRequestType.Params),
            deleteGroup,
            loggingError
        );
};

export default groupRoutes;
