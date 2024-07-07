class Animal {
    // constructor is a special function
    // that is called everytime an instance is created
    // generally used to initialize class variables
    constructor(name, legCount, speaks) {
        // instance variables
        // these variables are there for each object individually
        // that is each object has it's own copy of these variables
        this.name = name;
        this.legCount = legCount;
        this.speaks = speaks;
    }

    // methods not associated with objects but with class itself
    // they are the same for each instance created not not specific
    static myType() {
        console.log("Animal")
    }

    // class method
    speak() {
        console.log(this.name + " says " + this.speaks);
    }
}

// instance creation: let instance = new class_name(arguments)
let dog = new Animal("dog", 4, "bhow bhow");
let cat = new Animal("cat", 4, "meow meow");

dog.speak(); // Bhow Bhow
cat.speak(); // Meow Meow

Animal.myType(); // Animal
// dog.myType(); // ERR: because static methods called only for classes