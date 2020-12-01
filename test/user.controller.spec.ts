import { createUser, deleteUser, getAutoSuggestUsers, getUser, updateUser } from "../src/controllers/user.controller";
import { UserService } from "../src/services/user.service";
import * as SequelizeMock from 'sequelize-mock';

const mockUser = {
    login: "Leipoa ocellata",
    password: "XKZUFUF",
    age: 97,
    isDeleted: false
};

const mockUsers = [
    {
        login: "Corvus brachyrhynchos",
        password: "0sm1JaGRNo",
        age: 89,
        isDeleted: false
    },
    {
        login: "Cebus apella",
        password: "V3EbtZ6IZV6",
        age: 89,
        isDeleted: true
    },
    {
        login: "Colaptes campestroides",
        password: "TBzfzpPNI",
        age: 79,
        isDeleted: true
    },
];

jest.mock('../src/database/db', () => () => {
    const dbMock = new SequelizeMock();
    return dbMock.define('users',  mockUser)
});

describe('testing user controller', () => {
    const mockRequest = () => {
        const req: any = {};
        req.body = jest.fn().mockReturnValue(req);
        req.params = jest.fn().mockReturnValue(req);
        return req
    };

    const mockResponse = () => {
        const res: any = {};
        res.send = jest.fn().mockReturnValue(res);
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.end = jest.fn().mockReturnValue(res);
        return res
    };

    const mockNext = () => jest.fn();

    describe('testing createUser', () => {
        it('should create new user', async () => {
            jest.spyOn(UserService, 'createUser').mockResolvedValueOnce(mockUser as any);
            let req = mockRequest();
            req.body = mockUser;
            const res = mockResponse();
            const next = mockNext();

            await createUser(<any>req, <any>res, next);

            expect(UserService.createUser).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return error while create new user', async () => {
            jest.spyOn(UserService, 'createUser').mockRejectedValue('Adding new user wasn`t successful');
            let req = mockRequest();
            req.body = mockUser;
            const res = mockResponse();
            const next = mockNext();

            await createUser(<any>req, <any>res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.end).toHaveBeenCalledWith('Adding new user wasn`t successful');
            expect(next).toHaveBeenCalledWith({ name: 'createUser', args: mockUser, message: 'Adding new user wasn`t successful' });
        });
    });

    describe('testing getUser', () => {
        it('should get user by id', async () => {
            jest.spyOn(UserService, 'findById').mockResolvedValueOnce(mockUsers[1] as any);
            let req = mockRequest();
            req.params = { id: 2 };
            const res = mockResponse();
            const next = mockNext();

            await getUser(<any>req, <any>res, next);

            expect(UserService.findById).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(mockUsers[1]);
        });

        it('should return error while get user by id', async () => {
            jest.spyOn(UserService, 'findById').mockRejectedValue('No user with such id');
            let req = mockRequest();
            req.params = { id: 2 };
            const res = mockResponse();
            const next = mockNext();

            await getUser(<any>req, <any>res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.end).toHaveBeenCalledWith('No user with such id');
            expect(next).toHaveBeenCalledWith({ name: 'getUser', args: 2, message: 'No user with such id' });
        });
    });

    describe('testing updateUser', () => {
        it('should update user by id', async () => {
            jest.spyOn(UserService, 'updateUserById').mockResolvedValueOnce({
                login: "mock2",
                password: "V3EbtZ6IZV6",
                age: 89,
                isDeleted: true
            } as any);
            let req = mockRequest();
            req.params = { id: 2 };
            req.body = { login: 'mock2' };
            const res = mockResponse();
            const next = mockNext();

            await updateUser(<any>req, <any>res, next);

            expect(UserService.updateUserById).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({
                login: "mock2",
                password: "V3EbtZ6IZV6",
                age: 89,
                isDeleted: true
            });
        });

        it('should return error while update user by id', async () => {
            jest.spyOn(UserService, 'updateUserById').mockRejectedValue('No user with such id');
            let req = mockRequest();
            req.params = { id: 2 };
            req.body = { login: 'mock2' };
            const res = mockResponse();
            const next = mockNext();

            await updateUser(<any>req, <any>res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.end).toHaveBeenCalledWith('No user with such id');
            expect(next).toHaveBeenCalledWith({
                name: 'updateUser',
                args: {
                    id: 2,
                    user: {
                        login: 'mock2'
                    }
                },
                message: 'No user with such id'
            });
        });
    });

    describe('testing deleteUser', () => {
        it('should delete user by id', async () => {
            jest.spyOn(UserService, 'deleteUserById').mockResolvedValueOnce(mockUsers[1] as any);
            let req = mockRequest();
            req.params = { id: 2 };
            const res = mockResponse();
            const next = mockNext();

            await deleteUser(<any>req, <any>res, next);

            expect(UserService.deleteUserById).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(mockUsers[1]);
        });

        it('should return error while delete user by id', async () => {
            jest.spyOn(UserService, 'deleteUserById').mockRejectedValue('No user with such id');
            let req = mockRequest();
            req.params = { id: 2 };
            const res = mockResponse();
            const next = mockNext();

            await deleteUser(<any>req, <any>res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.end).toHaveBeenCalledWith('No user with such id');
            expect(next).toHaveBeenCalledWith({ name: 'deleteUser', args: 2, message: 'No user with such id' });
        });
    });

    describe('testing autosuggestUser', () => {
        it('should delete user by id', async () => {
            jest.spyOn(UserService, 'findAll').mockResolvedValueOnce(mockUsers[0] as any);
            let req = mockRequest();
            req.query = { substring: 'bus', limit: 3 };
            const res = mockResponse();
            const next = mockNext();

            await getAutoSuggestUsers(<any>req, <any>res, next);

            expect(UserService.findAll).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(mockUsers[0]);
        });

        it('should return error while delete user by id', async () => {
            jest.spyOn(UserService, 'findAll').mockRejectedValue('No user with such params');
            let req = mockRequest();
            req.query = { substring: 'bus', limit: 3 };
            const res = mockResponse();
            const next = mockNext();

            await  getAutoSuggestUsers(<any>req, <any>res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.end).toHaveBeenCalledWith('No user with such params');
            expect(next).toHaveBeenCalledWith({ name: 'getAutoSuggestUsers', args: { substring: 'bus', limit: 3 }, message: 'No user with such params' });
        });
    });

});
