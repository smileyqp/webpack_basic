/**
 * 测试webpack自身打包ESM（es模块化）以及Commonjs
 */
import {add,reduce} from './js/math_es6'                    //ES6
import smallpng from './assets/images/small.webp'
import onepng from './assets/images/1.jpg'

const {add1,reduce1} = require('./js/math_commonjs')        //commonjs

console.log(add(1,2))
console.log(add1(2,3))

console.log('helle webpack')


/**
 * 测试ES6转ES5
 */
const fn = () => {
    console.log('fn()')
} 

new Promise(()=>{})

Array.from(new Set([1,2,3,4]))

class A{
    
}



console.log('image',smallpng)
const $img = $('<img>').attr('src',smallpng)        //根据webpack配置；这个小于15k的图片会转为base64
const $img01 = $('<img>').attr('src',onepng)

$('body').append($img).append($img01)