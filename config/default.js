module.exports = {
    app: {
        port: 3000,
        db: {
            name: "ecommerce",
            uri: "mongodb://127.0.0.1:27017/ecommerce"
        },
        privateKey: "Knovator",
        redisDB: {
            port: 6379,
            host: '127.0.0.1'
        }
    },

}