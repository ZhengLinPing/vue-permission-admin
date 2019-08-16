
## 简介

vue-permission-admin 是一个后台前端权限管理解决方案，最大特点是权限控制到按钮级别，权限配置方便简单，非开发人员也可以配置。它使用了最新的前端技术栈，动态路由，权限配置，权限验证，它可以帮助你快速搭建企业级中后台权限管理。

前端基于: [vue-element-admin](https://panjiachen.github.io/vue-element-admin) 

服务端: koa2+mongodb

环境准备


[nodejs](http://nodejs.cn/download/) |
[mongodb](https://www.runoob.com/mongodb/mongodb-window-install.html) |
[redis](https://www.runoob.com/redis/redis-install.html)




## 功能

```
- 登录 / 注销

- 系统配置
  - 用户管理
  - 角色管理
  - 权限列表

- 多环境发布
  - dev sit stage prod

- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - Screenfull全屏
  - 自适应收缩侧边栏


```

## 开发

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-element-admin.git

# 进入项目目录
cd woniu-woniu-permission

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动前端服务
npm run dev

# 进入后端服务目录
cd server

# 安装依赖
npm install

# 启动后端服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```


Copyright (c) 2019 长城科技
