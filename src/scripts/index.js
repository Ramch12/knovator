const { redis } = require('../service/lib/db');

redis.set("dep", "seo")

redis.get('dep').then(res => {
    console.log("result", res)
}).catch(err => {
    console.log("Error", err)
});

// redis.lpush('mylist', 20);
(async () => {
    // await redis.lpush('mylist', [10, 19]);
    // await redis.rpop('mylist')

    // let res = await redis.lrange('mylist', 0, -1);
    // console.log("res", res)

    const info = {
        name: "Ram",
        designation: "SDE",
        salary: 25000
    };
    await redis.hset('info', info);
    const data = await redis.hgetall('info');
    console.log("Data", data);
})()
