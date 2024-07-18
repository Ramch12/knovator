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



/**
 * Hii how are you
 */
const findDateUsingNumber = (dayName) => {
    switch (dayName) {
        case 1:
            console.log("first Data");
            break;
        case 2:
            console.log("second Date");
            break;
        case 3:
            console.log("third Date");
            break;
        default:
            console.log("wrong date")
    }
}
findDateUsingNumber();