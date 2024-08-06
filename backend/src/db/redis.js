const { createClient } = require('redis');

const redisClient = createClient({
  socket: {
    host: 'localhost',
    port: 6379
  }
});

// Conecte apenas se ainda não estiver conectado
if (!redisClient.isOpen) {
  redisClient.connect().catch(console.error);
}

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

module.exports = redisClient;
