module.exports = app => {
  const Joi = app.Joi;

  const create = Joi.object().keys({
    name: Joi.string().required().error(new Error('角色名称不存在')),
  });

  const index = Joi.object().keys({
    page: Joi.number().default(1),
    limit: Joi.number().default(20),
  });

  const update = Joi.object().keys({
    name: Joi.string().required().error(new Error('角色名称不存在')),
    id: Joi.number().required().error(new Error('角色id不存在')),
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
