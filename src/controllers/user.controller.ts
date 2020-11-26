import { User } from '../../models/user.type';
import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { UserAutoSuggestSchema, UserParamsSchema, UserCreateRequestSchema, UserUpdateRequestSchema } from '../validators/user.validators';
import { Op } from 'sequelize';
import { UserService } from '../services/user.service';
import {loggingInfo} from "../middleware/logging.middleware";

export const createUser = async (req: ValidatedRequest<UserCreateRequestSchema>, res: Response, next): Promise<void> => {
    const args = new User(req.body);

    loggingInfo('createUser', args);

    try {
        const newUser = await UserService.createUser(args);
        res.json(newUser);
    } catch (err) {
        res.status(400).end('Adding new user wasn`t successful');
        next({ name: 'createUser', args, message: err });
    }
};

export const getUser = async (req: ValidatedRequest<UserParamsSchema>, res: Response, next): Promise<void> => {
    const id = +req.params.id;

    loggingInfo('getUser', id);

    try {
        const selectedUser = await UserService.findById(id);
        res.json(selectedUser);
    } catch (err) {
        res.status(400).end('No user with such id');
        next({ name: 'getUser', args: id, message: err });
    }
};

export const updateUser = async (req: ValidatedRequest<UserParamsSchema | UserUpdateRequestSchema>, res: Response, next): Promise<void> => {
    const id = +req.params.id;
    const user = req.body;

    loggingInfo('updateUser', { id, user});

    try {
        const updatedUser = await UserService.updateUserById(id, user);
        res.json(updatedUser);
    } catch (err) {
        res.status(400).end('No user with such id');
        next({ name: 'updateUser', args: { id, user}, message: err });
    }
};

export const deleteUser = async (req: ValidatedRequest<UserParamsSchema>, res: Response, next): Promise<void> => {
    const id = +req.params.id;

    loggingInfo('deleteUser', id);

    try {
        const deletedUser = await UserService.deleteUserById(id);
        res.json(deletedUser);
    } catch (err) {
        res.status(400).end('No user with such id');
        next({ name: 'deleteUser', args: id, message: err });
    }
};

export const getAutoSuggestUsers = async (req: ValidatedRequest<UserAutoSuggestSchema>, res: Response, next): Promise<void> => {
    const { substring, limit } = req && req.query;

    loggingInfo('getAutoSuggestUsers', { substring, limit });

    try {
        const autoSuggestUsers = await UserService.findAll({
            where: {
                login: {
                    [Op.substring]: substring
                }
            },
            order: [['login', 'ASC']],
            limit
        });
        res.json(autoSuggestUsers);
    } catch (err) {
        res.status(400).end('No user with such params');
        next({ name: 'getAutoSuggestUsers', args: { substring, limit }, message: err });
    }
};
