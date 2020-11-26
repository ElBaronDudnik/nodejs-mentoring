import * as jwt from 'jsonwebtoken';

export function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ success: false, message: 'Forbidden Error' });
    }

    return jwt.verify(token, 'secret', function(err) {
        if (err) {
            return res.status(401).send({ success: false, message: 'Unauthorized Error.' });
        }

        return next();
    })
}