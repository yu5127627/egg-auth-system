# eggAuthSystem

#### 介绍
egg.js + vue 的权限管理系统

#### 软件架构
    基于 egg.js + mysql + vue 的权限管理系统


#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

##### 1.egg 服务端

###### 目录介绍

    其他目录可参考 egg.js 文档。

```javascript
> app
  - controller  // 路由方法目录
  - extend      // egg 框架扩展目录
  - middleware  // 中间件目录
  - model       // sequelize 模型目录
  > modules     // 自定义的模块目录
    - BaseController.js     // 自定义扩展的 controller 模块
    - BaseService.js        // 自定义扩展的 service 模块
  - public      // 静态目录
  - routes      // 路由接口目录
  - service(选用)     // 业务处理模块
  - validator(选用)   // 数据校验目录
```

##### 接口定义模块(controller)

```javascript
# test.js
const BaseController = require('../modules/BaseController');
const MODULE_KEY = 'test';    // 与验证模块要使用的文件同名

class ManagerController extends BaseController {
  init() {
    this.MODULE_KEY = MODULE_KEY;
    this.setEntity(this.ctx.model.SysManager);    // 设置要使用的模型
  }
}

module.exports = ManagerController;
```

##### 业务处理模块(service)

```javascript
# test.js
const BaseService = require('../modules/BaseService');

class TestService extends BaseService {
}

module.exports = TestService;
```

##### 验证模块(validator)

```javascript
# test.js
module.exports = app => {
  const Joi = app.Joi;

  // 创建单个的验证
  const create = Joi.object().keys({
    name: Joi.string().required().error(new Error('角色名称不存在')),
    // ...
  });

  // 分页查询的验证
  const index = Joi.object().keys({
    page: Joi.number().default(1),
    limit: Joi.number().default(20),
    // ...
  });

  // 按 id 更新单个的验证
  const update = Joi.object().keys({
    name: Joi.string().required().error(new Error('角色名称不存在')),
    id: Joi.number().required().error(new Error('角色id不存在')),
    // ...
  });

  // 按 id 删除单个的验证
  const remove = Joi.object().keys({
    id: Joi.number().required().error(new Error('角色id不存在')),
    // ...
  });

  return {
    create,   // 创建的验证名
    index,    // 分页查询的验证名
    update,   // 按 id 更新单个验证名
    remove,   // 按 id 删除单个验证名
    item: remove,   // 按 id 查询单个的验证名
  };
};
```

##### 路由模块(routes)
    
    **因为个人不是特别喜欢 egg 的 RESTful 规范，所以没有使用。**

```javascript
# test.js
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/test', controller.manager.index);      // 分页查询
  router.get('/api/test/:id', controller.manager.item);   // 按 id 查询单个
  router.get('/api/test/list', controller.manager.list);  // 查询所有
  router.post('/api/test', controller.manager.create);    // 创建单个
  router.put('/api/test/:id', controller.manager.update);   // 按 id 更新单个
  router.delete('/api/test/:id', controller.manager.remove);    // 按 id 删除单个
};

```