module.exports = app => {
  const Joi = app.Joi;

  const create = Joi.object().keys({
    name: Joi.string().required().error(new Error('角色名称必填')),
    level: Joi.number().required().error(new Error('角色级别必填')),
    desc: Joi.string().empty(''),
  });

  const page = Joi.object().keys({
    page: Joi.number().default(1),
    limit: Joi.number().default(20),
  });

  const update = Joi.object().keys({
    id: Joi.number().required().error(new Error('角色id必填')),
    name: Joi.string().required().error(new Error('角色名称必填')),
    level: Joi.number().required().error(new Error('角色级别必填')),
    desc: Joi.string().default(''),
  });

  const remove = Joi.object().keys({
    ids: Joi.array().min(1).required()
      .error(new Error('菜单id数组不得为空')),
  });

  return {
    create,
    page,
    update,
    remove,
    item: remove,
  };
};
