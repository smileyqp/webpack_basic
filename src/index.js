/**
 * 测试webpack自身打包ESM（es模块化）以及Commonjs
 */
import {add,reduce} from './js/math_es6'                    //ES6
const {add1,reduce1} = require('./js/math_commonjs')        //commonjs

console.log(add(1,2))
console.log(add1(2,3))

console.log('helle webpack')

