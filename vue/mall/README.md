# mall

> 在线商城WebApp Vue Project

## 生成设置

``` bash
# 1.安装依赖包
npm install

# 启动程序打开浏览器 localhost:8080 / 0.0.0.0:8080
npm start

```
## 目录结构

``` bash

│  .babelrc                  ES6语法编译配置
│  .editorconfig             定义代码格式   
│  .postcssrc.js             转换css工具
│  index.html                入口页面
│  package.json              项目基本信息              
│  
├─build                      构建脚本目录
│      build.js              项目构建(webpack)相关代码
│      check-versions.js     检查node、npm等版本
│      logo.png              logo图片
│      utils.js              构建相关工具方法
│      vue-loader.conf.js    webpack loader配置
│      webpack.base.conf.js  webpack基础配置
│      webpack.dev.conf.js   webpack开发环境配置
│      webpack.prod.conf.js  webpack生产环境配置
│
├─config                     配置目录
│      dev.env.js            开发环境变量
│      index.js              项目配置文件
│      prod.env.js           生产环境变量
│      
├─dist
│  │  index.html             打包后的主页面
│  │
│  └─static/                 打包后的静态资源文件夹
│   
│
└─src                        源码目录 
   │
   │ App.vue                 项目入口组件
   │ main.js                 入口js文件
   │                 
   ├─api					        模拟服务器数据接口目录
   │  └─category.js          分类页面数据接口  
   │    config.js            接口数据配置
   │    home.js    			  主页面数据接口
   │  	product.js   		  商品详情数据接口
   │    search.js            搜索页数据接口
   │
   ├─assets                  资源目录
   │	  ├─fonts              图标字体目录
   │	  │   └─iconfont.eot   IE兼容的字体文件
   │    │     iconfont.svg   移动设备兼容字体文件
   │    │     iconfont.ttf   
   │    │     iconfont.woff  兼容较多浏览器字体文件
   │    │
   │    ├─js
   │    │  └─jsonp.js        封装jsonp方法
   │    │    mixins.js       搜索组件方法
   │    │    storage.js      客户端缓存方法
   │    │    until.js        函数节流
   │    │
   │    └─scss
   │        └─_base.scss     基础样式
   │          _container.scss 全局结构样式
   │          _icons.scss    图标字体样式
   │          _list.scss     全局清单结构样式
   │          _mixins.scss   混合宏样式
   │          _reset.scss    重置浏览器默认样式
   │          _tabbar.scss   导航条组件样式
   │          _variables.scss 样式变量
   │          index.scss     样式引入
   │    
   ├─base                    基础组件目录
   │    ├─backtop
   │    │      └─index.vue   回到顶部组件
   │    │
   │    ├─confirm            
   │    │      └─index.vue   弹窗组件
   │    │
   │    ├─loading            
   │    │      └─index.vue   加载组件
   │    │        loading.gif
   │    │
   │    ├─navbar     
   │    │      └─index.vue   顶部导航组件
   │    │    
   │    ├─scroll
   │    │      └─index.vue   滚动条组件
   │    │       config.js
   │    │
   │    ├─search-box
   │    │      └─index.vue   搜索组件
   │    │
   │    └─slider        
   │           └─index.vue   幻灯片组件
   │ 
   ├─components              vue公共组件目录
   │      index.vue          底部导航公共组件
   │
   ├─pages                   页面目录
   │    ├─cart               购物车页面
   │    │   │ config.js   
   │    │   │ content.vue    购物车内容子组件
   │    │   │ header.vue     购物车头部子组件
   │    │   │ index.vue      购物车父组件
   │    │   └─img
   │    │       └─cart1.jpg
   │    │         cart2.jpg
   │    │
   │    ├─categoty           分类页面
   │    │     config.js  
   │    │     content.vue    分类内容子组件
   │    │     header.vue     分类头部子组件
   │    │     index.vue      分类父组件
   │    │     tab.vue        分类选项子组件
   │    │
   │    ├─home               首页页面
   │    │     config.js      
   │    │     header.vue     首页头部子组件
   │    │     index.vue      首页父组件
   │    │     nav.vue        首页商品导航子组件
   │    │     recommend.vue  首页推荐商品子组件
   │    │     slider.vue     首页幻灯片子组件
   │    │ 
   │    ├─personal           我的页面
   │    │     assets.vue     我的资产子组件
   │    │     header.vue     我的头部子组件
   │    │     index.vue      我的父组件
   │    │     order.vue      我的订单子组件
   │    │     service.vue    我的服务子组件
   │    │     signin.vue     我的登录子组件
   │    │
   │    ├─product            商品页面
   │    │     config.js
   │    │     details.vue    商品详情子组件
   │    │     header.vue     商品头部子组件
   │    │     index.vue      商品父组件
   │    │     slider.vue     商品幻灯片子组件
   │    │     tabbar.vue     商品底部导航子组件
   │    │
   │    └─search             搜索页面
   │          config.js     
   │          header.vue     搜索头部子组件
   │          history.vue    历史搜索子组件
   │          hot.vue        热门搜索子组件
   │          index.vue      搜索父组件
   │          result.vue     搜索结果子组件
   │
   └──router
        └─ index.js           路由配置
      
```

####  一、首页

src/pages/home.vue   // 实现基本布局，幻灯片轮播，滚动条上拉刷新、图片懒加载、路由切换

![首页](/images/home.jpg)

####  二、分类

src/pages/category.vue   // 实现滚动条下拉更多内容

![分类页](/images/category.jpg)

####  三、购物车

src/pages/cart.vue   // 实现单选、全选、取消，加减合计价格计算

![购物车](/images/cart.jpg)

####  四、个人

src/pages/personal.vue   // 实现基本布局

![个人](/images/personal.jpg)

####  五、搜索

src/pages/search.vue   // 实现搜索、历史搜索、热门搜索功能

![搜索](/images/search.jpg)

####  六、商品详情

src/pages/product.vue   // 实现轮播商品详情

![商品详情](/images/product.jpg)

####  七、后台数据

暂时使用模拟数据
