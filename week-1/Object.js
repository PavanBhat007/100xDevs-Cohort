const obj = {
    key1: "value1",
    key2: "value2",
    key3: "value3",
}

console.log("Object: " + obj);

// keys of the object
console.log(Object.keys(obj));
// values of the object
console.log(Object.values(obj));

// gives the object's key-value pairs as nested arrays
console.log(Object.entries(obj));


console.log(obj.hasOwnProperty("key1")); // true
console.log(obj.hasOwnProperty("key4")); // false

// add new property of combine objects
// Object.assign(obj1, obj2, property_to_add)
console.log(Object.assign({}, obj, {newProp: "prop"}));
console.log(Object.assign({key0: "value0"}, obj, {newProp: "prop"}));