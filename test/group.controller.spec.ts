import { GroupService } from "../src/services/group.service";
import { createGroup } from "../src/controllers/group.controller";

const mockGroup = {
    id: 1,
    name: "Roombo",
    permission: ["WRITE", "READ"]
};

// const failedRes = {
//     "status": "Bad request",
//     "errors": [
//         {
//             "path": [
//                 "name"
//             ],
//             "message": "\"name\" is required"
//         },
//         {
//             "path": [
//                 "permission"
//             ],
//             "message": "\"permission\" is required"
//         }
//     ]
// };

it('should create new group', async () => {
    jest.spyOn(GroupService, 'createGroup').mockResolvedValueOnce(mockGroup as any);
    const req = {
        body: jest.fn().mockReturnValue(mockGroup),
        params: jest.fn().mockReturnThis()
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn()
    };
    const next = jest.fn();

    await createGroup(<any>req, <any>res);

    expect(GroupService.createGroup).toHaveBeenCalledTimes(1);
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.json).toHaveBeenCalledWith(mockGroup);
});
