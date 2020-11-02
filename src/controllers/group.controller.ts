import { GroupService } from "../services/group.service";
import { Group } from "../../models/group.type";
import { Response } from 'express';
import { ValidatedRequest } from "express-joi-validation";
import { GroupCreateRequestSchema, GroupParamsSchema, GroupUpdateRequestSchema } from "../validators/group.validators";
import { loggingInfo } from "../middleware/logging.middleware";

export const createGroup = async (req: ValidatedRequest<GroupCreateRequestSchema>, res: Response, next): Promise<void> => {
    const args = new Group(req.body);

    loggingInfo('createGroup', args);

    try {
        const newGroup = await GroupService.createGroup(args);
        res.json(newGroup);
    } catch (err) {
        res.status(400).end('Adding new group wasn`t successful');
        next({ name: 'createGroup', args, message: err });
    }
};

export const getGroupById = async (req: ValidatedRequest<GroupParamsSchema>, res: Response, next): Promise<void> => {
    const id = +req.params.id;

    loggingInfo('getGroupById', id);

    try {
        const selectedGroup = await GroupService.getGroupById(id);
        res.json(selectedGroup);
    } catch (err) {
        res.status(400).end('No group with such id');
        next({ name: 'getGroupById', args: id, message: err });
    }
};

export const getAllGroups = async (req, res: Response, next): Promise<void> => {
    loggingInfo('getAllGroups', null);

    try {
        const groups = await GroupService.getAllGroups();
        res.json(groups);
    } catch (err) {
        res.status(400).end('No existed groups');
        next({ name: 'getAllGroups', args: null, message: err });
    }
};

export const updateGroup = async (req: ValidatedRequest<GroupParamsSchema | GroupUpdateRequestSchema>, res: Response, next): Promise<void> => {
    const id = +req.params.id;
    const group = req.body;

    loggingInfo('updateGroup', { id, group });

    try {
        const updatedGroup = await GroupService.updateGroup(id, group);
        res.json(updatedGroup);
    } catch (err) {
        res.status(400).end('No group with such id');
        next({ name: 'updateGroup', args: { id, group }, message: err });
    }
};

export const deleteGroup = async (req: ValidatedRequest<GroupParamsSchema>, res: Response, next): Promise<void> => {
    const id = +req.params.id;

    loggingInfo('deleteGroup', id);

    try {
        const deletedGroup = await GroupService.deleteGroup(id);
        res.json(deletedGroup);
    } catch (err) {
        res.status(400).end('No group with such id');
        next({ name: 'deleteGroup', args: id, message: err });
    }
};
