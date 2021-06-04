/**
 * webpack配置要向外暴露一个对象，用commonjs的规范进行，因为webpack内部是基于node来进行的处理
 */

const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

function resolve(dir){          //传入一个目录名称，就返回当前目录名称所在的绝对路径

    return path.resolve(__dirname,dir)
}

module.exports = {
    //模式
    mode:'production',
    //入口:入口可以是字符串、对象、数组，都是可以的 
    entry:{
        main:resolve('src/index.js')
    },
    //出口
    output:{
        path:resolve('dist'),
        filename:'bundle.js'
    },
    //模块加载器
    module:{
        rules:[
            //处理ES6到ES5
            {
                test: /\.m?js$/,                                    //指定对哪些文件进行处理，正则
                exclude: /(node_modules|bower_components)/,         //不包括哪些文件
                include:resolve('src'),                                         //包括哪些文件
                use:[                                               //使用；可以使用对象、数组；写对象只有 一个loader，并且loader还有配置以及指定一些额外信息；对象是数组的简写，数组中可以有任意多的loader，但是数组这种方式不可以写配置
                    {                                              
                        loader: 'babel-loader',                     //babel也可以专门用配置文件babel.config.js或者.babelrc进行配置，也可以这两个配置文件都不屑直接在wbpack的这个地方进行配置即可
                        // options: {
                        //     presets: ['@babel/preset-env']       //这边的配置也可以在babel.config.js中写
                        // }
                    }
                ]                                                
                
            }
        ]
    },
    //插件
    plugins:[
        //向页面中引入打包的js或者css代码
        new HtmlWebpackPlugin({
            template:'public/index.html'           //指定以哪个为模板
        }),

        //清除打包文件夹
        new CleanWebpackPlugin(['dist'])
    ],

    //开发服务器
    devServer:{
        open:true   //自动打开浏览器访问
    }

}