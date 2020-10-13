import { GroupService } from "../services/group.service";
import { Group } from "../../models/group.type";
import { Response } from 'express';
import { ValidatedRequest } from "express-joi-validation";
import { GroupCreateRequestSchema, GroupParamsSchema, GroupUpdateRequestSchema } from "../validators/group.validators";

export const createGroup = async (req: ValidatedRequest<GroupCreateRequestSchema>, res: Response): Promise<void> => {
    const newGroup = await GroupService.createGroup(new Group(req.body));
    res.json(newGroup);
};

export const getGroupById = async (req: ValidatedRequest<GroupParamsSchema>, res: Response): Promise<void> => {
    const id = +req.params.id;
    const selectedGroup = await GroupService.getGroupById(id);

    if (selectedGroup) {
        res.json(selectedGroup);
    } else {
        res.status(400).end('No group with such id');
    }
};

export const getAllGroups = async (req, res: Response): Promise<void> => {
    const groups = await GroupService.getAllGroups();

    if (groups) {
        res.json(groups);
    } else {
        res.status(400).end('No existed groups');
    }
};

export const updateGroup = async (req: ValidatedRequest<GroupParamsSchema | GroupUpdateRequestSchema>, res: Response): Promise<void> => {
    const id = +req.params.id;
    const updatedGroup = await GroupService.updateGroup(id, req.body);

    if (updatedGroup) {
        res.json(updatedGroup);
    } else {
        res.status(400).end('No group with such id');
    }
};

export const deleteGroup = async (req: ValidatedRequest<GroupParamsSchema>, res: Response): Promise<void> => {
    const id = +req.params.id;
    const deletedGroup = await GroupService.deleteGroup(id);

    if (deletedGroup) {
        res.json(deletedGroup);
    } else {
        res.status(400).end('No group with such id');
    }
};
