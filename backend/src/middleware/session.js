const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redisClient = require('../db/redis');

const redisStore = new RedisStore({ client: redisClient, prefix:"myapp:", });

function getAllActiveSessions() {
    return new Promise((resolve, reject) => {
        redisStore.all((err, sessions) => {
            if (err) reject(err);
            else {
                console.log(sessions);
                resolve(sessions);
            }
        });
    });
}

// Chame getAllActiveSessions apenas se necessário
// getAllActiveSessions().catch(console.error);

module.exports = session({
    store: redisStore,
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // true em produção
        httpOnly: true, // previne acesso ao cookie via JavaScript no cliente
        maxAge: 1000 * 60 * 60 * 1, // tempo de vida do cookie em milissegundos (1 hora)
        sameSite: 'strict',
    }
});
