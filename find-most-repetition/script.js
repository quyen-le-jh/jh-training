function findMostRepetitions(arr) {
  const countMap = {};

  for (let i = 0; i < arr.length; i++) {
    countMap[arr[i]] = (countMap[arr[i]] || 0) + 1;
  }

  let maxCount = 0;
  for (let number in countMap) {
    if (countMap[number] > maxCount) {
      maxCount = countMap[number];
    }
  }

  const result = [];
  for (let number in countMap) {
    if (countMap[number] === maxCount) {
      result.push(parseInt(number));
    }
  }

  return result;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 1, 2, 3];

console.log(findMostRepetitions(arr));
