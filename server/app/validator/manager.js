module.exports = app => {
  const Joi = app.Joi;

  const create = Joi.object().keys({
    username: Joi.string().required().error(new Error('用户名必填')),
    password: Joi.string().min(6).max(16)
      .error(new Error('密码必填')),
    roleId: Joi.number().required().error(new Error('必须关联一个角色')),
    avatar: Joi.string().default('https://img2.baidu.com/it/u=1322999984,1933233612&fm=15&fmt=auto&gp=0.jpg'),
    nickname: Joi.string().default('一号用户'),
  });

  const index = Joi.object().keys({
    page: Joi.number().default(1),
    limit: Joi.number().default(20),
  });

  const update = Joi.object().keys({
    id: Joi.number().required().error(new Error('用户id必填')),
    username: Joi.string().required().error(new Error('用户名必填')),
    password: Joi.string().min(6).max(16)
      .error(new Error('密码必填')),
    roleId: Joi.number().required().error(new Error('必须关联一个角色')),
  });

  const remove = Joi.object().keys({
    id: Joi.number().required().error(new Error('角色id不存在')),
  });

  return {
    create,
    index,
    update,
    remove,
    item: remove,
  };
};
