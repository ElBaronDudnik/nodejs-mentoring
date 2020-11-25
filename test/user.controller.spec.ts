import { createUser } from "../src/controllers/user.controller";
import { UserService } from "../src/services/user.service";

const mockUser = {
    login:"Leipoa ocellata",
    password:"XKZUFUF",
    age:"97",
    isDeleted:false
};

it('should create new user', async () => {
    jest.spyOn(UserService, 'createUser').mockResolvedValueOnce(mockUser as any);
    const req = {
        body: jest.fn().mockReturnValue(mockUser),
        params: jest.fn().mockReturnThis()
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn()
    };

    const next = jest.fn();

    await createUser(<any>req, <any>res);

    expect(UserService.createUser).toHaveBeenCalledTimes(1);
    expect(res.json.mock.calls.length).toBe(1);
    expect(res.json).toHaveBeenCalledWith(mockUser);
});