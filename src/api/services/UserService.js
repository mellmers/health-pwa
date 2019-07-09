import jwt from 'jsonwebtoken';

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const expiresIn = 24  *  60  *  60;
        const accessToken = jwt.sign({ sub: user.id }, process.env.API_SECRET, { expiresIn: expiresIn});
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            accessToken,
            expiresIn
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}


export default {
    authenticate,
    getAll
};