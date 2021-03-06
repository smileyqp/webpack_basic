/**
 * webpack配置要向外暴露一个对象，用commonjs的规范进行，因为webpack内部是基于node来进行的处理
 */

const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtracPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');
const { optimize } = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');




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
        filename:'bundle.js',
        publicPath:'/'          //解决图片路径问题；所有生成的URL链接左侧用/开头；即相对路径
    },
    //模块加载器；按照顺序从下往上执行。enfore可以改变这个顺序
    module:{
        rules:[
            {
                enforce:'pre',          //前置loader最先执行;pre:最先执行；post:最后执行
                test: /\.m?js$/,        
                include:resolve('src'), 
                loader:'eslint-loader',  
                options:{
                    formatter:'eslint-friendly-formatter'       //友好格式化
                }
            },
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
                
            },{
                //处理图片
                test: /\.(jpe?g|png|webp|gif)$/,                                    //指定对哪些文件进行处理，正则
                use:[                                               //使用；可以使用对象、数组；写对象只有 一个loader，并且loader还有配置以及指定一些额外信息；对象是数组的简写，数组中可以有任意多的loader，但是数组这种方式不可以写配置
                    {                                              
                        loader: 'url-loader',                     //babel也可以专门用配置文件babel.config.js或者.babelrc进行配置，也可以这两个配置文件都不屑直接在wbpack的这个地方进行配置即可。处理图片、字体、音视频等
                        options: {
                            limit: 1024*15,                         //把小于15kb的进行base64处理
                            name:'img/[name].[ext]'                 //文件路径；相对于所有文件下面的；[name]文件名[ext]后缀扩展名
                        }
                    }
                ]      
            }, 
            //处理css
            {
                test: /\.css$/,                                    //指定对哪些文件进行处理，正则
                exclude: /(node_modules|bower_components)/,         //不包括哪些文件
                include:resolve('src'),                                         //包括哪些文件
                use:[                                               //使用；可以使用对象、数组；写对象只有 一个loader，并且loader还有配置以及指定一些额外信息；对象是数组的简写，数组中可以有任意多的loader，但是数组这种方式不可以写配置
                    MiniCssExtracPlugin.loader,         //代替style-loader
                    // 'style-loader',             //style-loader将js中的css放到style标签中去      配置多个loader整体的顺序是从下往上，从右往左。所以应该是css-loader放在style-loader的下面
                    'css-loader',                //css-loader将css内容打包到js中去
                    'postcss-loader',           //预处理css的，要在css前进行，因此由于loader加载顺序，放在css-loader的下面或者右边

                ]                                                
                
            },
            //处理less
            {
                test: /\.less$/,                                    //指定对哪些文件进行处理，正则
                exclude: /(node_modules|bower_components)/,         //不包括哪些文件
                include:resolve('src'),                                         //包括哪些文件
                use:[                                               //使用；可以使用对象、数组；写对象只有 一个loader，并且loader还有配置以及指定一些额外信息；对象是数组的简写，数组中可以有任意多的loader，但是数组这种方式不可以写配置
                    MiniCssExtracPlugin.loader,         //代替style-loader
                    // 'style-loader',             //style-loader将js中的css放到style标签中去      配置多个loader整体的顺序是从下往上，从右往左。所以应该是css-loader放在style-loader的下面
                    'css-loader',               //css-loader将css内容打包到js中去
                    'postcss-loader',
                    'less-loader',
                ]                                                
                
            },
            //处理stylus
            {
                test: /\.(styl|stylus)$/,                                    //指定对哪些文件进行处理，正则
                exclude: /(node_modules|bower_components)/,         //不包括哪些文件
                include:resolve('src'),                                         //包括哪些文件
                use:[                                               //使用；可以使用对象、数组；写对象只有 一个loader，并且loader还有配置以及指定一些额外信息；对象是数组的简写，数组中可以有任意多的loader，但是数组这种方式不可以写配置
                    MiniCssExtracPlugin.loader,
                    // 'style-loader',             //style-loader将js中的css放到style标签中去      配置多个loader整体的顺序是从下往上，从右往左。所以应该是css-loader放在style-loader的下面
                    'css-loader',               //css-loader将css内容打包到js中去
                    'postcss-loader',
                    'stylus-loader'
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
        new CleanWebpackPlugin(['dist']),
        // new webpack.ProvidePlugin({
        //     jQuery: "jquery",           //配置jquery
        //     $: "jquery" 
        // }) 

        
        //从js中抽取css单独打包;一旦抽取了css就不需要cssloader了，需要换成这个插件里面的loader。单独打包css
        new MiniCssExtracPlugin({
            filename:'css/[name].css'
        }),

        
    ],

    //开发服务器
    devServer:{
        open:true   //自动打开浏览器访问
    },


    //优化配置
    optimization:{
        minimizer:[new OptimizeCssAssetsPlugin()]
    }

}