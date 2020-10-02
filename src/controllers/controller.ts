import { User } from '../../models/user.type';
import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { UserAutoSuggestSchema, UserParamsSchema, UserCreateRequestSchema, UserUpdateRequestSchema } from '../validators/validators';
import { Op } from 'sequelize';
import { UserService } from '../services/service';

export const createUser = async (req: ValidatedRequest<UserCreateRequestSchema>, res: Response): Promise<void> => {
    const newUser = await UserService.createUser(new User(req.body));
    res.json(newUser);
};

export const getUser = async (req: ValidatedRequest<UserParamsSchema>, res: Response): Promise<void> => {
    const id = +req.params.id;
    const selectedUser = await UserService.findById(id);

    if (selectedUser) {
        res.json(selectedUser);
    } else {
        res.status(400).end('No user with such id');
    }
};

export const updateUser = async (req: ValidatedRequest<UserParamsSchema | UserUpdateRequestSchema>, res: Response): Promise<void> => {
    const id = +req.params.id;

    const updatedUser = await UserService.updateUserById(id, req.body);
    res.json(updatedUser);
};

export const deleteUser = async (req: ValidatedRequest<UserParamsSchema>, res: Response): Promise<void> => {
    const id = +req.params.id;

    const deletedUser = await UserService.deleteUserById(id);

    if (deletedUser) {
        res.json(deletedUser);
    } else {
        res.status(400).end('No user with such id');
    }
};

export const getAutoSuggestUsers = async (req: ValidatedRequest<UserAutoSuggestSchema>, res: Response): Promise<void> => {
    const { substring, limit } = req && req.query;

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
};
