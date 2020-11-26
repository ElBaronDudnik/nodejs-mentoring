import { Users } from "../database/db";
import * as jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { login, password } = req.body;

    try {
        const person = await Users.findOne({
            where: {
                login,
                password
            },
        });
        const payload = { sub: person.get('id') };
        const token = jwt.sign(payload, 'secret');
        return res.send(token);
    } catch (err) {
        res.status(400).end('No user with such credentials');
    }
};
