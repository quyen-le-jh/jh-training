function removeDuplicateByUsingLoop1(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }
  return result;
}

function removeDuplicateByUsingSet(arr) {
  return [...new Set(arr)];
}

function removeDuplicateByUsingLoop2(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

function removeDuplicateByUsingObject(arr) {
  const element = {};
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!element[arr[i]]) {
      result.push(arr[i]);
      element[arr[i]] = true;
    }
  }
  return result;
}

const arr = [1, 2, 3, 4, 1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(removeDuplicateByUsingObject(arr));
