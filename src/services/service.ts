import Users from '../database/db';
import { UserType } from '../../models/user.type';

export class UserService {
    static async findById(id: number): Promise<Users> {
        return await Users.findByPk(id);
    }

    static async updateUserById(id: number, keys: Partial<UserType>): Promise<Users> {
        const user = await this.findById(id);

        return await user.update(keys);
    }

    static async deleteUserById(id: number): Promise<Users> {
        const user = await this.findById(id);

        return await user.update({ isDeleted: true });
    }

    static async createUser(newUser: UserType): Promise<Users> {
        return await Users.create(newUser);
    }

    static async findAll(options: unknown): Promise<Users[]> {
        return await Users.findAll(options);
    }
}
