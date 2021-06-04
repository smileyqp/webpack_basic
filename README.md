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



webpack本身不会处理ES6语法，需要babel进行处理