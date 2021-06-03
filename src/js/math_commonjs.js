const { reduce } = require("./math_es6");

function add1(a,b){
    return a + b;
}

function reduce1(a,b){
    return a - b;
}

exports.add1 = add1;
exports.reduce1 = reduce1;
