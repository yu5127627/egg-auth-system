module.exports = app => {
  const Joi = app.Joi;

  const create = Joi.object().keys({
    title: Joi.string().required().error(new Error('菜单名称必填')),
  });

  const index = Joi.object().keys({
    page: Joi.number().default(1),
    limit: Joi.number().default(20),
  });

  const update = Joi.object().keys({
    id: Joi.number().required().error(new Error('菜单id必填')),
    title: Joi.string().required().error(new Error('菜单名称必填')),
  });

  const remove = Joi.object().keys({
    id: Joi.number().required().error(new Error('菜单id必填')),
  });

  return {
    create,
    index,
    update,
    remove,
    item: remove,
  };
};