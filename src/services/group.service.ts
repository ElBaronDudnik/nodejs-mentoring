import { GroupType } from "../../models/group.type";
import { Groups } from "../database/db";

export class GroupService {
    static async getGroupById (id: number) {
        return await Groups.findByPk(id);
    }

    static async getAllGroups () {
        return await Groups.findAll();
    }

    static async createGroup (newGroup: GroupType) {
        return await Groups.create(newGroup);
    }

    static async updateGroup (id: number, keys: Partial<GroupType>) {
        return await Groups.update(keys, {
            where: { id }
        });
    }

    static async deleteGroup (id: number) {
        return await Groups.destroy({
            where: { id }
        });
    }
}