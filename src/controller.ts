import { User, UserType } from './user.type';
import { Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { UserAutoSuggestSchema, UserParamsSchema, UserRequestSchema } from './validators';

const users: UserType[] = [];

export const createUser = (req: ValidatedRequest<UserRequestSchema>, res: Response): void => {
    const newUser = new User(req.body);
    users.push(newUser);
    res.json(newUser);
};

export const getUser = (req: ValidatedRequest<UserParamsSchema>, res: Response): void => {
    const id = req.params.id;
    const selectedUser = users && users.find((user: UserType) => user.id === id);

    if (selectedUser) {
        res.json(selectedUser);
    } else {
        res.status(400).end('No user with such id');
    }
};

export const updateUser = (req: ValidatedRequest<UserParamsSchema | UserRequestSchema>, res: Response): void => {
    const id = req.params.id;
    users.forEach((user: UserType, index) => {
        if (user.id === id) {
            users[index] = req.body;
        }
    });

    res.json(users);
};

export const deleteUser = (req: ValidatedRequest<UserParamsSchema>, res: Response): void => {
    const id = req.params.id;
    const deletedUser = users && users.find((user: UserType) => user.id === id);

    if (deletedUser) {
        deletedUser.isDeleted = true;
        res.json(deletedUser);
    } else {
        res.status(400).end('No user with such id');
    }
};

export const getAutoSuggestUsers = (req: ValidatedRequest<UserAutoSuggestSchema>, res: Response): void => {
    const { substring, limit } = req && req.query;
    const autoSuggestUsers = users && users
        .filter((user: UserType) => user.login.includes(substring))
        .slice(0, limit)
        .sort((a, b) => a.login.toLocaleLowerCase() < b.login.toLocaleLowerCase() ? -1 : 1);

    res.json(autoSuggestUsers);
};
