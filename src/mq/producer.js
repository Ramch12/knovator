const { Queue } = require('bullmq');
const studentQueue = new Queue('studentQueue', {
    connection: {
        host: "127.0.0.1",
        port: 6379,
    }
});

(async () => {
    const studentData = await studentQueue.add('student1', {
        name: "test1",
        college: "somecollege",
        email: "test1@gmail.com",
        address: "some Addreess"
    });
    console.log(`Data of student with id ${studentData.id} has added to queue`)
})()