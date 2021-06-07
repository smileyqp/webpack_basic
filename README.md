```shell
yarn init -y

yarn add -D webpack webpack-cli

//创建src/index.js因为webpack打包默认会找src目录下面的index.js文件
//此时执行webpack命令，可以看到webpack将其打了个基础包，在dist目录下

//package.json中配置打包命令，之后使用npm run build进行webpack打包
  "scripts": {
    "build":"webpack"
  },
```

创建`webpack.config.js`文件，写入相关配置

```shell


```

上一次打包的文件清除`clean-webpack-plugin@1.0.1 `

解决手动引入`html-webpack-plugin`

解决自动打包不需要手动打包`webpack-dev-server`

```shell
yarn add -D webpack-dev-server	html-webpack-plugin		clean-webpack-plugin@1.0.1 

cnpm install @babel/core @babel/plugin-transform-runtime @babel/polyfill @babel/preset-env @babel/runtime autoprefixer babel-eslint babel-loader copy-webpack-plugin css-loader eslint eslint-friendly-formatter eslint-loader file-loader html-webpack-plugin --save-dev
```

``````

``````

##### 配置babel的加载模块

webpack本身不会处理ES6语法，需要babel进行处理

[babel-loader配置文档链接](https://webpack.js.org/loaders/babel-loader/#root)

[babel的babel.config.js文件配置](https://babel.docschina.org/docs/en/configuration/)

```shell
module.exports = function (api) {
    api.cache(true);        //做缓存处理加载打包
  
    const presets = [               //预设的数组;可以直接写一个数组，里面是包的名称字符串；如果这个包有一些其他的配置项的话，那么每一个配置也用一个数组表示，这个数组的第一位就是包名称，第二位是一个{},里面写相关配置选项
       [ 
           '@babel/preset-env',         //预设配置的包名
            {                           //预设配置的配置
                "useBuiltIns":'usage',     //有三个只：false、usage、entry。默认值false，polyfill全部引入打包;usage用到什么打包什么;entry根据配置的浏览器目标来进行打包。只打包引入浏览器没有实现的
                "corejs":2,                 //corejs版本
                "targets":{
                    "ie":10,
                    "chrome":67
                }
            }                          
        ],
    ];            
    const plugins = [               //插件的数组
        "@babel/plugin-transform-runtime"

    ];            
    return {
      presets,
      plugins
    };
  }
```

##### 配置样式打包加载模块

```shell
cnpm install style-loader css css-loader less less-loader node-sass sass-loader stylus stylus-loader  --save
```

##### PostCss

[postcss官网](https://www.postcss.com.cn/)

- postcss.config.js

```shell
module.exports = {
    plugins: [
    //   require('precss'),
      require('autoprefixer')()
    ]
 }
```

- config.webpack.js中postcss配置

```shell
    //模块加载器
    module:{
        rules:[
            //处理css
            {
                test: /\.css$/,                                    //指定对哪些文件进行处理，正则
                exclude: /(node_modules|bower_components)/,         //不包括哪些文件
                include:resolve('src'),                                         //包括哪些文件
                use:[                                               //使用；可以使用对象、数组；写对象只有 一个loader，并且loader还有配置以及指定一些额外信息；对象是数组的简写，数组中可以有任意多的loader，但是数组这种方式不可以写配置
                    'style-loader',             //style-loader将js中的css放到style标签中去      配置多个loader整体的顺序是从下往上，从右往左。所以应该是css-loader放在style-loader的下面
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
                    'style-loader',             //style-loader将js中的css放到style标签中去      配置多个loader整体的顺序是从下往上，从右往左。所以应该是css-loader放在style-loader的下面
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
                    'style-loader',             //style-loader将js中的css放到style标签中去      配置多个loader整体的顺序是从下往上，从右往左。所以应该是css-loader放在style-loader的下面
                    'css-loader',               //css-loader将css内容打包到js中去
                    'postcss-loader',
                    'stylus-loader'
                ]                                                
                
            }
        ]
    },
```

##### 样式单独打包和压缩

- mini-css-extract-plugin

```shell
npm install --save-dev mini-css-extract-plugin
```

webpack中配置

```shell
const MiniCssExtracPlugin = require('mini-css-extract-plugin')


//webpack中配置
plugins:[
    //从js中抽取css单独打包;一旦抽取了css就不需要cssloader了，需要换成这个插件里面的loader。单独打包css
    new MiniCssExtracPlugin({
        filename:'css/[name].css'
    })
]
  

//webpack中loader配置。使用MiniCssExtracPlugin.loader代替style-loader即可
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
```



- css样式压缩

```shell
npm install --save-dev optimize-css-assets-webpack-plugin
```

配置

```shell

```

