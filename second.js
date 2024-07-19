let objectNew = {
  name: "John",
  collge: "object",
  compNm: "knovator",
};

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
      console.log("wrong date");
  }
};
findDateUsingNumber();

(async () => {
  try {
    const [result] = await Promise.all([
      new Promise((resolve, reject) => {
          reject("Rejected");
          resolve("promise successfully resolved");
      }),
    ]);
    console.log("result", result);
  } catch (err) {
    console.log("Error", err);
  }
})();
