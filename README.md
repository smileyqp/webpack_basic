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

