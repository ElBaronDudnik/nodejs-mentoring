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
import { checkToken } from "../middleware/jwt.middleware";
import { loggingError } from "../middleware/logging.middleware";

const groupRoutes = (app: Application): void => {
    app.route('/group')
        .get(
            checkToken,
            getAllGroups,
            loggingError
        )
        .post(
            validateGroupSchema(groupSchema,ContentRequestType.Body),
            checkToken,
            createGroup,
            loggingError
        );

    app.route('/group/:id')
        .get(
            validateGroupSchema(groupParamsSchema, ContentRequestType.Params),
            checkToken,
            getGroupById,
            loggingError
        )
        .put(
            validateGroupSchema(groupParamsSchema, ContentRequestType.Params),
            validateGroupSchema(groupSchemaOptionalParams, ContentRequestType.Body),
            checkToken,
            updateGroup,
            loggingError
        )
        .delete(
            validateGroupSchema(groupParamsSchema, ContentRequestType.Params),
            checkToken,
            deleteGroup,
            loggingError
        );
};

export default groupRoutes;
