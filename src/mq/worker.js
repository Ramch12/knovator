const { Worker } = require('bullmq');

const customeDelay = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    }, 5 * 1000);
})
const worker = new Worker('studentQueue', async (studentData) => {
    console.log(`Processing started with student id ${studentData.data.name}}`);
    await customeDelay;
    console.log(`processing done with student data ${studentData.data.name}`);
}, {
    connection: {
        host: "127.0.0.1",
        port: 6379,
    }
});
worker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});
