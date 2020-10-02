import { DataTypes, Model, Sequelize } from 'sequelize';
import fs from 'fs';
import { User } from '../../models/user.type';

export const sequelize = new Sequelize('postgres://postgres:FGsltw@Jhn316@localhost:5432/users');

export default class Users extends Model {}
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
}, { sequelize, modelName: 'users', timestamps: false });

sequelize.sync();

Users.count().then((res: number) => {
    if (res < 1) {
        fs.readFile('./mock/users_mock_data.json', 'utf8', (err: Error, data: string) => {
            if (err) throw err;
            const users = JSON.parse(data);
            users.forEach((user: User) => Users.create(user));
        });
    }
});
