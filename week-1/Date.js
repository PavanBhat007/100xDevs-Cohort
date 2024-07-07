const currDate = new Date();

// console.log(currDate.getDate());
// console.log(currDate.getTime()); // time in ms since 1970 (epoch timestamp)
// console.log(currDate.getSeconds());
// console.log(currDate.getMinutes());
// console.log(currDate.getHours());
// console.log(currDate.getDay()); // 1 - monday, 2 - tuesday ...
// console.log(currDate.getMonth() + 1); // +1 because 0 indexed
// console.log(currDate.getYear()); // curr year - 1900
// console.log(currDate.getFullYear());

// getTime() most imp because can be used to measure time
// time taken for a function to run
// counter, ... etc

function calculateSum (n) {
    let a = 0;
    for(let i=0; i<n; i++) {
        a += i;
    }
    return a;
}

const startTime = (new Date()).getTime();
let res = calculateSum(100000000);
const endTime = (new Date()).getTime();


console.log(
    "Time taken for calculateSum() to run (in ms): " 
    + (endTime-startTime) + " ms"
);

