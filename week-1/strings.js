function getLength(str) {
    console.log("String: " + str);
    console.log("Length: " + str.length);
}

function findIndexOf(str, target) {
    console.log("String: " + str);

    // first occuring index
    console.log("Index: " + str.indexOf(target));
    
    // last occuring index
    console.log("Index: " + str.lastIndexOf(target));
}

function getSlice(str, start, end) {
    console.log("String: " + str);

    // inclusive of start, exclusive of end
    console.log("Slice: " + str.slice(start, end));

    // deprecated: substr(start, length)
    // str.substr(6, 5); -> starting from 6, gives next 5 chars
}

function replaceStr(str, target, replacer) {
    console.log("String: " + str);
    console.log("New String: " + str.replace(target, replacer));
}

function splitString(str, delimiter) {
    console.log("String: " + str);

    // splits str into an array based on delimiter
    console.log(str.split(delimiter));

    // is delimiter not present in str,
    // whole string becomes 1 value in the output array
}

function trimString(str) {
    console.log("String: " + str);

    // removes additional spaces in the beginning and end only
    console.log("Trimmed String: " + str.trim());
}

function toUpper(str) {
    console.log("String: " + str);
    console.log("New String: " + str.toUpperCase());
}

function toLower(str) {
    console.log("String: " + str);
    console.log("New String: " + str.toLowerCase());
}


getLength("Hello World!!"); // 13
findIndexOf("Hello World!!", "World"); // 6 6
findIndexOf("Hello World World World!!", "World"); // 6 18
getSlice("Hello World!!", 6, 11); // World
replaceStr("Hello World!!", "World", "India"); // 'Hello India!!'
splitString("Hello World!!", " ") // ['Hello', 'World!!']
trimString("     Hello    World!!     ") // 'Hello    World!!'
toUpper("Hello World!!"); // 'HELLO WORLD!!'
toLower("Hello World!!"); // 'hello world!!'