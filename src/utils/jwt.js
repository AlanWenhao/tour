import jwt from 'jsonwebtoken';

// eslint-disable-next-line
export function decode(token) {
    return jwt.decode(token);
}
