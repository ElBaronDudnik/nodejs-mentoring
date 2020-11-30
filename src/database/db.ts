import { DataTypes, Model, Sequelize } from "sequelize";
import fs from "fs";
import { User } from "../../models/user.type";
import { Group } from "../../models/group.type";
import { logger } from "../logger";

let users;
let groups;

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.PASSWORD_NAME,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    });

fs.readFile(
    './mock/users_mock_data.json', 'utf8',
    (err: Error, data: string) => {
        if (err) {
            logger.log({
                level: 'error',
                message: 'Error while reading users mock'
            });
            throw err;
        }
        users = JSON.parse(data);
    }
);

fs.readFile(
    './mock/groups_mock_data.json', 'utf8',
    (err: Error, data: string) => {
        if (err) {
            logger.log({
                level: 'error',
                message: 'Error while reading groups mock'
            });
            throw err;
        }
        groups = JSON.parse(data);
    }
);

export class Users extends Model {}
Users.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'users',
    timestamps: false
});

export class Groups extends Model {}
Groups.init({
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    permission:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:true
    }
}, {
    sequelize,
    modelName: 'groups',
    timestamps: false
});

export class UserGroups extends Model {}
UserGroups.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'groups',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'userGroups',
    timestamps: false,
});

Users.belongsToMany(Groups, { through: UserGroups, foreignKey: 'userId' });
Groups.belongsToMany(Users, { through: UserGroups, foreignKey: 'groupId' });

sequelize.sync()
    .then(() => groups.forEach((group: Group) =>
        Groups.create(group).catch(err => logger.log({ level: 'error', message: err }))))
    .then(() => users.forEach((user: User) =>
        Users.create(user).catch(err => logger.log({ level: 'error', message: err }))))
    .then(() => addUsersToGroup(1, [5, 6, 12, 99]))
    .then(() => addUsersToGroup(2, [7, 11, 25, 29]))
    .catch((err: Error) => logger.log({ level: 'error', message: `Error while filling out the database: ${err}`}));

function addUsersToGroup(groupId, userIds) {
    userIds.forEach(async (id: number) => {
        try {
            const user = await Users.findByPk(id);
            // @ts-ignore
            if (!user.hasGroup([groupId])) {
                // @ts-ignore
                await user.addGroup([groupId]);
            }
        } catch (err) {
            logger.log({ level: 'error', message: 'Error while adding Users to group' });
        }
    });
}
