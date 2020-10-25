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

const groupRoutes = (app: Application): void => {
    app.route('/group')
        .get(getAllGroups)
        .post(
            validateGroupSchema(groupSchema,ContentRequestType.Body),
            createGroup
        );

    app.route('/group/:id')
        .get(
            validateGroupSchema(groupParamsSchema, ContentRequestType.Params),
            getGroupById
        )
        .put(
            validateGroupSchema(groupParamsSchema, ContentRequestType.Params),
            validateGroupSchema(groupSchemaOptionalParams, ContentRequestType.Body),
            updateGroup
        )
        .delete(
            validateGroupSchema(groupParamsSchema, ContentRequestType.Params),
            deleteGroup
        );
};

export default groupRoutes;
