function removeDuplicateByUsingSet(arr) {
  return [...new Set(arr)];
}

function removeDuplicateByUsingLoop(arr) {
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

function removeDuplicate(arr, selection = "Set") {
  switch (selection) {
    case "Set": {
      return removeDuplicateByUsingSet(arr);
    }
    case "Loop": {
      return removeDuplicateByUsingLoop(arr);
    }
    case "Object": {
      return removeDuplicateByUsingObject(arr);
    }
    default: {
      throw new Error("Invalid method");
    }
  }
}

console.log(removeDuplicate(arr, "Set"));
