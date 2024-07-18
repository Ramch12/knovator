let objectNew = {
    name: "John",
    collge: "object",
    compNm: "knovator"
}


/**
 * Hii i am doing this to make a confict so that i can resolve it
 * @param {new object}
 */

function calculateSumforcomplexOperation() {
    let sum = 0;
    let newObjectTosum = {
        first: 1,
        second: 2,
        third: 3,
        fourth: 4,
        fifth: 5,
        sixth: 6
    };
    Object.keys(newObjectTosum).forEach((item) => {
        sum += newObjectTosum[item]
    });
    console.log(`sum is ${sum}`);
}
calculateSumforcomplexOperation();

