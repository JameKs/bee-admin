# BEE Admin

[![node](https://img.shields.io/badge/node-%3E%3D8.6.0-brightgreen.svg)](##)
[![npm](https://img.shields.io/npm/v/npm.svg)](##)
[![react](https://img.shields.io/badge/react-v16.2.0-brightgreen.svg)](##)
[![antd](https://img.shields.io/badge/antd-v3.0.3-brightgreen.svg)](##)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](##)
[![release](https://img.shields.io/badge/release-v1.0.0-519dd9.svg)](##)

BEE Admin 是基于 React+Antd 构建的后台管理系统框架

![Dashboard](http://10.181.138.118/bee/bee-admin/raw/master/screenshots/Dashboard.png)

- 在线预览: <http://localhost:3000>

## 目录

- [特性](#特性)
- [技术栈](#技术栈)
- [如何使用](#如何使用)
- [目录结构](#目录结构)
- [模块说明](#模块说明)
  - [后台通信](#后台通信)
  - [导航数据](#导航数据)
  - [页面布局](#页面布局)
  - [路由控制](#路由控制)
  - [动态菜单](#动态菜单)
  - [数据处理](#数据处理)
  - [交易示例](#交易示例)
  - [新增交易](#新增交易)
  - [模拟数据](#模拟数据)
  - [代码规范](#代码规范)
  - [生产发布](#生产发布)
- [演示](#演示)
  - [桌面端](#桌面端)
  - [移动端](#移动端)
- [兼容性](#兼容性)
- [参考](#参考)

## 特性

- **常用场景设计**：包含管理系统中常见的使用场景。
- **最新技术栈**：使用React/Antd等前沿的技术进行搭建。
- **响应式布局**：同时适配桌面PC端和移动端展现。
- **动态权限控制**：通过后台产生的权限数据进行菜单展现及路由控制。
- **灵活数据处理**：基于Redux规划框架数据区和交易数据区,保证数据相互隔离。
- **表单组件封装**：通过封装常用的表单组件实现快速开发和统一维护的目标。
- **完整交易示例**：提供完整的交易流程示例。
- **使用模拟数据**：使用Mock数据实现前端可以完全独立地进行开发调试。

## 技术栈

react&nbsp;`v16.2.0`&nbsp;&nbsp;&nbsp;
redux&nbsp;`v3.7.2`&nbsp;&nbsp;&nbsp;
redux-saga&nbsp;`v0.16.0`&nbsp;&nbsp;&nbsp;
react-router-dom&nbsp;`v4.2.2`&nbsp;&nbsp;&nbsp;
antd&nbsp;`v3.0.3`&nbsp;&nbsp;&nbsp;
fetch&nbsp;`v2.0.3`&nbsp;&nbsp;&nbsp;
less&nbsp;`v2.7.2`&nbsp;&nbsp;&nbsp;
echarts&nbsp;`v3.8.5`&nbsp;&nbsp;&nbsp;
eslint&nbsp;`v4.10.0`&nbsp;&nbsp;&nbsp;
webpack&nbsp;`v3.8.1`&nbsp;&nbsp;&nbsp;
json-server&nbsp;`v0.12.0`&nbsp;&nbsp;&nbsp;

## 如何使用

启动框架

```bash
> git clone http://10.181.138.118/bee/bee-admin.git
> cd bee-admin
> yarn install
> npm run start
```

启动数据服务

```bash
> cd bee-admin
> npm run mock
```

编译生产版本

```bash
> cd bee-admin
> npm run build
```

## 目录结构

```bash
├── /build/            # 项目输出目录
├── /config/           # webpack配置目录
├── /mock/             # json-server配置目录
│ ├── /custom/         # 自定义签到逻辑
│ ├── /data/           # 模拟数据文件
│ ├── /routes/         # 自定义路由
│ ├── /auth.js         # 访问令牌控制
│ ├── /server.js       # json-server入口文件
├── /public/           # 公共静态文件
├── /screenshots/      # READEME.md中展示的图片
├── /scripts/          # 启动、构建和测试脚本
├── /src/              # 项目源码目录
│ ├── /components/     # 自定义组件
│ │ ├── basic          # 基本组件
│ │ └── loan           # 信贷组件
│ ├── /constants/      # 项目常量
│ ├── /frames/         # 框架组件
│ ├── /Layouts/        # 布局组件
│ ├── /models/         # 数据模型
│ ├── /reducers/       # reducers
│ ├── /routes/         # 交易路由组件
│ ├── /services/       # 数据接口
│ ├── /stores/         # 创建redux store
│ ├── /styles/         # 项目样式
│ ├── /utils/          # 工具函数
│ │ ├── HttpClient.js  # 通信工具函数
│ │ ├── LayoutUtils.js # 布局工具函数
│ │ ├── ParseUtils.js  # 解析工具函数
│ │ ├── SysUtils.js    # 系统工具函数
│ │ └── Theme.js       # 样式变量
│ ├── App.js           # 交易入口
│ ├── config.json      # 项目配置文件
│ ├── index.js         # 框架入口
│ ├── route.js         # 路由配置
├── package.json       # 项目信息
├── .eslintrc          # Eslint配置
```

## 模块说明

### 后台通信

后台通讯使用`fetch`作为基础模块进行了封装，客户端发送的数据类型和接收的数据类型被限定为`application/json`。

封装后提供的API接口：

```js
  get(url, params)   // params为json对象
  post(url, body)    // body为json对象
  put(url, body)     // body为json对象
  del(url, body)     // body为json对象
```

服务端返回的数据结构:

```js
{
  "total": 1,
  "data": {},
  "code": "OK",
  "message": "成功"
}

```

返回的数据遵循以下几个原则：

- 如果请求成功，`code`的值为`OK`，否则为错误码。
- 如果请求成功，`message`的值为`成功`，否则为错误信息。
- 如果请求成功，`data`的值为实际返回的数据内容，否则为空。
- 如果返回的数据有多条，`total`的值则表示数据的条数。

如果请求失败，框架提供了两种方式展示错误信息:

- 发送`SET_ERROR`的`action`，框架收到后将弹出模态框展示错误信息。
- 使用`Result`组件进行错误信息展示。

建议：

- 交易初始化数据时发生错误或者在页面中进行数据联动时发生错误，建议使用模态框展示错误信息。
- 交易提交时发生错误，建议使用`Result`组件展示错误信息。

代码可参见`utils/HttpClient.js`。

### 导航数据

导航数据是生成菜单和路由所需的原始数据集合。

导航数据格式：

```js
{
  "navs": [
    {
      "id": "admin",
      "nav": [{
        "layout": "AppLayout",
        "children": [{
          "name": "表单页",
          "icon": "form",
          "path": "form",
          "isEntrance": true
        }]
      }]
    }
  ]
}
```

- layout：布局方式，目前支持`UserLayout`和`AppLayout`。
- children：子节点，可以嵌套多个`children`来实现多层菜单和路由控制。
- name：子节点名称，用于展示菜单项描述和面包屑。
- icon：子节点图标，用于指定菜单项图标。
- path：子节点路由，用于生成路由控制数据。
- isEntrance：子节点是否为交易入口，如果是，子节点将在菜单中展示，否则不展示。

导航数据可参见`mock/data/navs.json`、`src/models/frames/Nav.js`和`src/services/frames/navs.js`。

### 页面布局

目前支持两种页面布局，分别为`UserLayout`和`AppLayout`。

#### UserLayout

UserLayout用于展示用户注册、用户登录和找回密码等功能的布局。

![UserLayout](http://10.181.138.118/bee/bee-admin/raw/master/screenshots/UserLayout.png)

- Header：用于展现项目logo、标题及项目描述信息。
- Content：用于渲染用户注册、登录和找回密码组件。
- Footer：用于展现帮助、隐私、条款及Copyright等信息。

UserLayout可参见`src/layouts/UserLayout`

#### AppLayout

AppLayout用于展示项目主框架的布局。

![AppLayout](http://10.181.138.118/bee/bee-admin/raw/master/screenshots/AppLayout.png)

- Sider：用于展现项目logo、项目简称、菜单等信息或组件。
- Header：用于展现消息提示和登录用户等信息。
- Content：用于渲染交易组件。
- Footer：用于展现公司名称和Copyright等信息。

AppLayout布局代码：

```text
<Layout className={styles.app}>
  {!isMobile && <SiderLayout />}
    <Layout>
    <HeaderLayout />
    <CBread />
    <ContentLayout path={location.pathname} component={component} />
    <FooterLayout links={links} copyright={copyright} />
  </Layout>
</Layout>
```

AppLayout可参见`src/layouts/AppLayout`

### 路由控制

在框架入口文件`index.js`中，对路由控制的顶层组件`Routers`进行渲染：

```text
ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>, document.getElementById('root')
);
```

`Routers`组件内部根据不同的访问路由，渲染不同的展现组件：

```text
<Router history={this.props.history}>
  <Switch>
    <Route path="/user" component={UserLayout} />
    <CRoute path="/" component={App} />
  </Switch>
</Router>
```

当访问路由为`/user`开始的情况下，将渲染`UserLayout`组件，否则渲染`App`组件。

#### 渲染UserLayout组件

`UserLayout`组件内部，将进行路由选择。

如果当前路由能精确匹配`/user/login`时，将渲染`Login`组件，展现用户签到页面。

否则将渲染`NotFound`组件，展现`404`页面。

```text
<Switch>
  <Route path="/user/login" exact component={Login} />
  <Route component={NotFound} />
</Switch>
```

#### 渲染App组件

如果访问路由不为`/user`开始，则将通过`CRoute`组件渲染`App`组件。

```text
<CRoute path="/" component={App} />
```

`CRoute`组件内部，将首先判断用户是否已经登录，如果没有登录，则将重定向到登录页面，否则进行`App`组件渲染。

```text
const userid = window.sessionStorage.getItem('userid');
return (
  <Route
    {...rest}
    render={props =>
    (
      userid == null
        ? (<Redirect to={{ pathname: '/user/login', state: { from: props.location } }} />)
        : (<Component {...props} />)
    )}
  />
);
```

`App`组件内部，调用`createRouteComponent`方法创建当前路由对应的路由对象。

`createRouteComponent`方法中需要使用路由数据进行路由权限判断。

路由数据是从导航数据中提取生成，格式如下：

```js
[{
  "name": "基础表单一",
  "path": "/form/basic-form/basic-one",
  "isEntrance": true,
  "exact": true
}]
```

`createRouteComponent`方法判断逻辑：

1. 判断`src/routes`文件夹中是否存在当前访问路由对应的组件，如果不存在，则通过`AppLayout`展现`404`页面。
2. 判断路由数据中是否存在当前访问的路由，如果不存在，则通过`AppLayout`展现`403`页面。
3. 通过`AppLayout`展现当前访问路由对应的交易组件，`component`属性对应的组件最终会渲染到`AppLayout`布局中`Content`部分，完成交易页面展现。

```text
<AppLayout
  isMobile={isMobile}
  location={location}
  component={component}
/>
```

路由控制可参见`src/index.js`、`src/routers.js`、`src/App.js`和`src/layouts`。

### 动态菜单

菜单由菜单组件`CMenu` 生成，菜单组件所需要的数据从导航数据中提取生成。

菜单数据格式：

```js
[{
  "name": "表单页",
  "icon": "form",
  "path": "form",
  "isEntrance": true,
  "children": []
}]
```

- name：菜单名称。
- icon：菜单项图标。
- path：菜单项对应的路由。
- isEntrance：是否为交易入口，如果是，将在菜单中展示，否则不展示。
- children：子菜单，嵌套多个`children`可以实现多层菜单。

当用户完成签到后，路由跳转到项目主框架，主框架将使用当前登录的用户向后台服务请求导航数据，后台服务可以根据当前登录用户的权限生成导航数据并返回到前端，前端通过导航数据生成用户对应权限的菜单数据并交给菜单组件进行菜单渲染，实现用户登入系统时展示用户对应权限的菜单项功能。

菜单数据生成代码可参见`App.js`、`models/frames/Nav.js` 和 `services/frames/nav.js`。

菜单渲染可参见菜单组件`src/frames/CMenu`。

### 数据处理

框架使用`redux`构建了全局数据区，并将数据区划分为框架数据区和交易数据区。

可以使用`redux-devtools`插件查看`Redux State`数据，如下图：

![Redux](http://10.181.138.118/bee/bee-admin/raw/master/screenshots/Redux.png)

其中`frames`、`layouts`及`error`为框架使用的数据区域，`routes`为交易使用的数据区。

#### 框架数据区

如果需要操作框架数据区的数据，可以发送特定的`action`到`redux`。

- frames
  - SET_FRAMES_STATE
  - REPLACE_FRAMES_STATE
- layouts
  - SET_LAYOUTS_STATE
  - REPLACE_LAYOUTS_STATE
- error
  - SET_ERROR

使用`SET_XXX_STATE`的`action`向对应的数据区中设置数据。

使用`REPLACE_XXX_STATE`的`action`向对应的数据区中重置数据。

#### 交易数据区

同理，如果需要操作交易数据区，也可以发送特定的`action`到`redux`。

- routes
  - SET_ROUTES_STATE
  - REPLACE_ROUTES_STATE

使用`SET_ROUTES_STATE`的`action`向交易数据区中设置数据。

使用`REPLACE_ROUTES_STATE`的`action`向交易数据区中重置数据。

#### 数据区清除机制

1. 用户使用`F5`刷新

      当用户按下`F5`按钮进行页面刷新，`redux`将进行`@@INIT`操作，清空所有数据区数据。

      对于框架数据区而言， 由于主框架在进行`F5`刷新后会重新装载，重新请求框架数据（例如导航数据等），将完成框架数据区重新初始化。

      对于交易数据区而言，由于主框架中渲染的交易组件在进行`F5`刷新后也会重新装载，并完成`componentWillMount`和`componentDidMount`生命周期中的数据初始化，但在交易其他过程中保存的交易数据将丢失，即当前交易恢复到刚进入交易的数据状态。

2. 路由变化时按需清空交易数据区

      在设计时，交易数据区的作用域为单个交易，如果交易变化，即路由发生变化，框架会默认清除交易数据区中所有数据，保证进入新交易时数据区是完全干净无副作用的。

      但是有一些特殊的情况需要处理：

      （1）交易之间的数据传递

      假设交易1完成后跳转到交易2，交易2需要使用交易1中的部分数据，这时可以选择在交易1完成时将交易2需要的数据`REPLACE`到交易数据区，使用`API` `SysUtils.push2Route(dispatch, history, route, false)`进行路由跳转，并告知框架当前路由跳转时不需要清空缓冲区，即可将交易1中的数据保留到交易2中使用。

      （2）网络脏数据

      框架中异步处理部分全部使用`redux-saga`进行管理，假设交易1还在进行后台数据请求过程中，用户点击菜单导致路由跳转到交易2，则有一定几率会发生框架清空了交易数据区后，交易1的请求数据操作才完成，并调用交易1对应的`saga`异步操作设置数据到交易数据区，导致交易2使用的数据区中存在脏数据。

      为了避免上述情况，框架在路由跳转时，将向`redux-saga`发送`FRAME_SAGA_CANCEL`的`action`，取消所有交易级未完成的异步操作，保证数据区数据的可靠性。

      ```text
      const clearSign = SysUtils.getPropsValue(nextProps.location, ['state', 'clearSign'], true);
      if (this.props.location.pathname !== location.pathname) {
        this.props.dispatch({ type: FRAME_SAGA_CANCEL });
        if (clearSign === true) {
          this.props.dispatch({ type: REPLACE_ROUTES_STATE, payload: {} });
        }
      }
      ```
数据处理可参见`src/stores`、`src/frames/CRoute`、`src/models/frames`、`src/models/routes`和`src/reducers`。

### 交易示例

项目中提供了常用的交易示例，分为表单页、列表页和详情页。

表单页中提供了按照传统方式编写的单列和两列表单，按照组件方式编写的单列、两列和三列表单，分步表单和高级表单等内容，每种表单都包含了提交失败->返回修改->提交成功->再做一笔等功能，形成完整的交易流程展示。

列表页中提供了基础表格、可编辑表格、基础列表和卡片列表的操作展示。

详情页提供了基础查询页和综合信息查询页的操作展示。

交易示例可参见`src/routes`、`src/models/routes`、`src/services/routes`和`src/components`。

### 新增交易

新增交易需要完成以下两点：

- 修改`mock/navs.json`，新增交易对应的导航数据。
- 在`src/routes`文件夹中新增交易对应的组件。

假设需要新增交易，交易名称为`测试交易`，`icon`为`rocket`，路由路径为`test`，步骤如下：

1. 修改`mock/navs.json`文件，新增交易对应的导航数据：

    ```js
    {
      "navs": [
        {
          "id": "admin",
          "nav": [
          {
            "layout": "AppLayout",
            "children": [
              ...
              // 新增导航数据
              {
                "name": "测试交易",
                "icon": "rocket",
                "path": "test",
                "isEntrance": true
              },
              ...
            ],
            ...
          }]
        }
      ]
    }
    ```

2. 重启模拟数据服务

3. 使用`F5`刷新或`重新登录`来刷新框架数据

    此时侧边菜单栏已经可以显示新增的导航数据对应的菜单项，但是点击菜单项会重定向到`404`页面。

    这是由于`App.js`中的`createRouteComponent`方法在路由位置`src/routes/test`目录中没有找到可渲染的交易组件。

4. 添加路由对应的交易组件

    在`src/routes/test`目录中添加`index.js`文件并编写交易组件即可。

### 模拟数据

项目中使用`json-server`作为`mock`服务器，可以实现前端完全独立地进行开发调试。

所有模拟数据以`json`文件的格式放置在`mock/data`文件夹中。

为了模拟生产上真实的运行场景，在每一次前台和后台的通信过程中，都加入了随机的响应延迟：

```js
server.use((req, res, next) => {
  setTimeout(next, Math.random() * 3000);
});

```

启动模拟数据服务需要使用命令行：

```bash
npm run mock
```

模拟数据可参见`mock/data`。

模拟响应延迟可参见`mock/server.js`。

### 代码规范

项目中使用`ESLint`检查的`JavaScript`和`JSX`语法和规范。

规则库使用`airbnb`，并自定义了部分规则。

代码规范配置可参见`.eslintrc`。

### 生产发布

项目使用`webpack`进行打包发布。

打包主要配置如下：

![Webpack-Config](http://10.181.138.118/bee/bee-admin/raw/master/screenshots/Webpack-Config.png)

打包发布需要使用命令行：

```bash
npm run build
```

完成打包后输出如下内容：

![Webpack-Result](http://10.181.138.118/bee/bee-admin/raw/master/screenshots/Webpack-Result.png)

完成打包后会自动启动`Webpack Bundle Analyzer`进行包分析：

![Webpack-Analyzer](http://10.181.138.118/bee/bee-admin/raw/master/screenshots/Webpack-Analyzer.png)

生产发布可参见`config/webpack.config.prod.js`。

## 演示

### 桌面端

[点击查看大图](http://10.181.138.118/bee/bee-admin/raw/master/screenshots/PC-Demo.gif)

![PC-Demo](http://10.181.138.118/bee/bee-admin/raw/master/screenshots/PC-Demo.gif)

### 移动端

![Mobile-Demo](http://10.181.138.118/bee/bee-admin/raw/master/screenshots/Mobile-Demo.gif)

## 兼容性

项目使用`nginx`进行部署，浏览器使用`chrome`和`firefox`测试通过。

## 参考

在项目开发过程中，参考了以下脚手架项目：

- ant-design-pro <https://github.com/ant-design/ant-design-pro/>
- antd-admin <https://github.com/zuiidea/antd-admin>
