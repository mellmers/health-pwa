import { expressjwt } from 'express-jwt';

export default function jwt() {
    return expressjwt({ secret: process.env.API_SECRET, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/ping',
            '/api/version',
            '/api/users/authenticate',
            '/api/users/register',
        ]
    });
}