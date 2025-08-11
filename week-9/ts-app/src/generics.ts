function identity<T>(arg: T) {
    return arg;
}

let output1 = identity<string>("string");
let output2 = identity<number>(24);

// console.log(output1.toUpperCase())
// console.log(output2 + 100)

function firstElement<T>(arr: T[]) {
    return arr[0];
}

console.log(firstElement(["Pavan", "Bhat"])) // Pavan
console.log(firstElement([1, 2]))            // 1