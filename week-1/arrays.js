function appendAtEnd(arr, ele) {
    console.log("Before: [ " + arr + " ] ");
    arr.push(ele);
    console.log("After: [ " + arr + " ]");
}

function removeFromEnd(arr) {
    console.log("Before: [ " + arr + " ] ");
    arr.pop();
    console.log("After: [ " + arr + " ]");
}

function appendAtStart(arr, ele) {
    console.log("Before: [ " + arr + " ] ");
    arr.unshift(ele);
    console.log("After: [ " + arr + " ]");
}

function removeFromStart(arr) {
    console.log("Before: [ " + arr + " ] ");
    arr.shift();
    console.log("After: [ " + arr + " ]");
}

function joinArrays(arr1, arr2) {
    console.log("Array 1: " + arr1);
    console.log("Array 2: " + arr2);
    let arr3 = arr1.concat(arr2); // has to be re-assigned
    console.log("Combined: " + arr3);
}

let array = [1,2,3,4,5,6];
// appendAtEnd(array, 10); // [1,2,3,4,5,6] -> [1,2,3,4,5,6,10]
// removeFromEnd(array); // [1,2,3,4,5,10] -> [1,2,3,4,5,6]
// appendAtStart(array, 10); // [1,2,3,4,5,6] -> [10,1,2,3,4,5,6]
// removeFromStart(array); // [10,1,2,3,4,5,6] -> [1,2,3,4,5,6]
// joinArrays([1,2,3], [4,5,6]); // [1,2,3,4,5,6]

/*  forEach example */ 
// for(let i=0; i<array.length; i++)
//         console.log(array[i]);

function customPrint(ele) {
    console.log(" | " + ele + " | ");
}

// array.forEach(callback)
array.forEach(customPrint);
// callback function called for each element in array
