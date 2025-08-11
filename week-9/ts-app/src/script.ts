function greet(fname: string) {
    console.log(`Hello ${fname}`)
}

function sum (a: number, b: number): number {
    return a+b;
}

function runAfter1S (fn: () => void) {
    setTimeout(fn, 1000);
}

// -------------------------------------------------

interface User {
    firstname: string;
    lastname: string;
    age: number;
}

function isLegal (user: User) {
    return (user.age > 18 ?  true :  false)
}

const user = {
  firstname: "Pavan",
  lastname: "Bhat",
  age: 22
}

// -------------------------------------------------

interface Person {
    name: string;
    age: number;
    greet: (phrase: string) => void;
}

class Manager implements Person {
    name: string;
    age: number;

    constructor(n:string, a: number) {
        this.name = n;
        this.age = a;
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }
}

const manager = new Manager("Pavan", 22)
manager.greet("Hello! I am")

// -------------------------------------------------

type NumsArr = number[];

function maxValue (arr: NumsArr) {
    let max = arr[0]!;
    for(let i=0; i<arr.length; i++) {
        if (arr[i]! > max) {
            max = arr[i]!
        }
    }

    return max;
}