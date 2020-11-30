import { GroupService } from "../src/services/group.service";
import {createGroup, deleteGroup, getAllGroups, getGroupById, updateGroup} from "../src/controllers/group.controller";
import * as SequelizeMock from 'sequelize-mock';

const mockGroup = {
    id: 4,
    name: "Roombo",
    permission: ["WRITE", "READ"]
};

const mockGroups = [{
    id: 1,
    name: "mock1",
    permission: ["DELETE", "SHARE", "UPLOAD_FILES"]
}, {
    id: 2,
    name: "mock2",
    permission: ["WRITE", "READ", "DELETE", "SHARE"]
}, {
    id: 3,
    name: "mock3",
    permission: ["SHARE", "UPLOAD_FILES"]
}];

jest.mock('../src/database/db', () => () => {
    const dbMock = new SequelizeMock();
    return dbMock.define('groups',  mockGroups);
});

describe('testing groups controller', () => {
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

    describe('testing CreateGroup', () => {
        it('should create new group', async () => {
            jest.spyOn(GroupService, 'createGroup').mockResolvedValueOnce(mockGroup as any);
            let req = mockRequest();
            req.body = mockGroup ;
            const res = mockResponse();
            const next = mockNext();

            await createGroup(<any>req, <any>res, next);

            expect(GroupService.createGroup).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(mockGroup);
        });

        it('should return error while create new group', async () => {
            jest.spyOn(GroupService, 'createGroup').mockRejectedValue('Adding new group wasn`t successful');
            let req = mockRequest();
            req.body = mockGroup;
            const res = mockResponse();
            const next = mockNext();

            await createGroup(<any>req, <any>res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.end).toHaveBeenCalledWith('Adding new group wasn`t successful');
            expect(next).toHaveBeenCalledWith({ name: 'createGroup', args: mockGroup, message: 'Adding new group wasn`t successful' });
        });
    });

    describe('testing getGroupById', () => {
        it('should get group by id', async () => {
            jest.spyOn(GroupService, 'getGroupById').mockReturnValue(mockGroups[2] as any);
            let req = mockRequest();
            req.params = { id: 3 };
            const res = mockResponse();
            const next = mockNext();

            await getGroupById(<any>req, <any>res, next);

            expect(GroupService.getGroupById).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(mockGroups[2]);
        });

        it('should return error while get group by id', async () => {
            jest.spyOn(GroupService, 'getGroupById').mockRejectedValue('No group with such id');
            let req = mockRequest();
            req.params = { id: 3 };
            const res = mockResponse();
            const next = mockNext();

            await getGroupById(<any>req, <any>res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.end).toHaveBeenCalledWith('No group with such id');
            expect(next).toHaveBeenCalledWith({ name: 'getGroupById', args: 3, message: 'No group with such id' });
        });
    });

    describe('testing getAllGroups', () => {
        it('should get all groups', async () => {
            jest.spyOn(GroupService, 'getAllGroups').mockResolvedValueOnce(mockGroups as any);

            const req = mockRequest();
            const res = mockResponse();
            const next = mockNext();

            await getAllGroups(<any>req, <any>res, next);

            expect(GroupService.getAllGroups).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(mockGroups);
        });

        it('should return error while get all groups', async () => {
            jest.spyOn(GroupService, 'getAllGroups').mockRejectedValue('No existed groups');

            const req = mockRequest();
            const res = mockResponse();
            const next = mockNext();

            await getAllGroups(<any>req, <any>res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.end).toHaveBeenCalledWith('No existed groups');
            expect(next).toHaveBeenCalledWith({ name: 'getAllGroups', args: null, message: 'No existed groups' });
        });
    });

    describe('testing updateGroup', () => {
        it('should update group', async () => {
            jest.spyOn(GroupService, 'updateGroup').mockResolvedValueOnce({
                id: 2,
                name: 'Abrakadabra',
                permission: ["WRITE", "READ", "DELETE", "SHARE"]
            } as any);

            let req = mockRequest();
            req.params = { id: 3 };
            req.body = { name: 'Abrakadabra' };
            const res = mockResponse();
            const next = mockNext();

            await updateGroup(<any>req, <any>res, next);

            expect(GroupService.updateGroup).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({
                id: 2,
                name: 'Abrakadabra',
                permission: ["WRITE", "READ", "DELETE", "SHARE"]
            });
        });

        it('should return error while update group', async () => {
            jest.spyOn(GroupService, 'updateGroup').mockRejectedValue('No group with such id');

            const req = mockRequest();
            req.params = { id: 3 };
            req.body = { name: 'Abrakadabra' };
            const res = mockResponse();
            const next = mockNext();

            await updateGroup(<any>req, <any>res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.end).toHaveBeenCalledWith('No group with such id');
            expect(next).toHaveBeenCalledWith({
                name: 'updateGroup',
                args: {
                    id: 3,
                    group: {
                        name: 'Abrakadabra'
                    }
                },
                message: 'No group with such id'
            });
        });
    });

    describe('testing delete group', () => {
        it('should delete group', async () => {
            jest.spyOn(GroupService, 'deleteGroup').mockResolvedValueOnce(mockGroups[1] as any);

            let req = mockRequest();
            req.params = { id: 2 };
            const res = mockResponse();
            const next = mockNext();

            await deleteGroup(<any>req, <any>res, next);

            expect(GroupService.deleteGroup).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(mockGroups[1]);
        });

        it('should return error while delete group', async () => {
            jest.spyOn(GroupService, 'deleteGroup').mockRejectedValue('No group with such id');

            const req = mockRequest();
            const res = mockResponse();
            req.params = { id: 2 };
            const next = mockNext();

            await deleteGroup(<any>req, <any>res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.end).toHaveBeenCalledWith('No group with such id');
            expect(next).toHaveBeenCalledWith({ name: 'deleteGroup', args: 2, message: 'No group with such id' });
        });
    });
});


