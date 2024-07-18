const mongoose = require('mongoose');
const config = require('config');
const Redis = require('ioredis')
const connect = () => {
    return mongoose.connect(config.get('app.db.uri'))
}

const redis = new Redis({
    port: config.get('app.redisDB.port'),
    host: config.get('app.redisDB.host'),
});

redis.on('connect', () => {
    console.log("Successfully connected to redish database!")
});
redis.on('ready', () => {
    console.log("Redis server is ready")
});
redis.on("error", (err) => {
    console.log("Error in redis server", err)
})

module.exports = { redis, connect }

