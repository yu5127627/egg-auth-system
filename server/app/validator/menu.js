module.exports = app => {
  const Joi = app.Joi;

  const create = Joi.object().keys({
    title: Joi.string().required()
      .error(new Error('菜单名称必填')),
    cache: Joi.boolean().default(false),
    islink: Joi.boolean().default(false),
    name: Joi.string().empty(''),
    path: Joi.string().empty(''),
    pid: Joi.number().empty(''),
    rule: Joi.string().empty(''),
    show: Joi.boolean().default(true),
    sort: Joi.number().default(999),
    type: Joi.number().empty(''),
  });

  const index = Joi.object().keys({
    page: Joi.number().default(1),
    limit: Joi.number().default(20),
  });

  const update = Joi.object().keys({
    id: Joi.number().required()
      .error(new Error('菜单id必填')),
    title: Joi.string().required()
      .error(new Error('菜单名称必填')),
    cache: Joi.boolean().default(false),
    icon: Joi.string().default('search'),
    islink: Joi.boolean().default(false),
    name: Joi.string().empty(''),
    path: Joi.string().empty(''),
    pid: Joi.number().empty(''),
    rule: Joi.string().empty(''),
    show: Joi.boolean().default(true),
    sort: Joi.number().default(999),
    type: Joi.number().empty(''),
    url: Joi.string().required().error(new Error('菜单地址不得为空')),
  });

  const item = Joi.object().keys({
    ids: Joi.number().required().error(new Error('菜单id必填')),
  });

  const remove = Joi.object().keys({
    ids: Joi.array().min(1).required()
      .error(new Error('菜单id数组不得为空')),
  });

  return {
    create,
    index,
    update,
    item,
    remove,
  };
};

