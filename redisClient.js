const redis = require('redis');
const client = redis.createClient({
 host: 'eu2-intense-roughy-31023.upstash.io',
 port: 31023,
});

client.on('connect', () => {
 console.log('Connected to Redis');
});

client.on('error', (err) => {
 console.log('Redis Client Error:', err);
});

module.exports = client;