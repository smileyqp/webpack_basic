module.exports = function (api) {
    api.cache(true);        //做缓存处理加载打包
  
    const presets = [               //预设的数组;可以直接写一个数组，里面是包的名称字符串；如果这个包有一些其他的配置项的话，那么每一个配置也用一个数组表示，这个数组的第一位就是包名称，第二位是一个{},里面写相关配置选项
       [ 
           '@babel/preset-env',         //预设配置的包名
            {                           //预设配置的配置
                "useBuiltIns":false     //默认值false，polyfill全部引入打包
            }                          
        ],
    ];            
    const plugins = [ ];            //插件的数组
  
    return {
      presets,
      plugins
    };
  }