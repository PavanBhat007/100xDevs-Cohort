// converts string to an integer
function convToInt(str) {
    console.log("Input: " + str);
    console.log(parseInt(str));
}

// converts string to float
function convToFloat(str) {
    console.log("Input: " + str);
    console.log(parseFloat(str));
}

convToInt("42");        // 42
convToInt("42abc");     // 42
convToInt("abc42abc");  // NaN
convToInt("a4b2c");     // NaN
convToInt("3.14");      // 3

convToFloat("42");        // 42
convToFloat("42abc");     // 42
convToFloat("abc42abc");  // NaN
convToFloat("a4b2c");     // NaN
convToFloat("3.14");      // 3.14