module.exports = app => {
  const Joi = app.Joi;

  const create = Joi.object().keys({
    action: Joi.string().required().error(new Error('规则必填')),
    description: Joi.string().error(new Error('规则描述格式错误')),
  });

  const index = Joi.object().keys({
    page: Joi.number().default(1),
    limit: Joi.number().default(20),
  });

  const update = Joi.object().keys({
    id: Joi.number().required().error(new Error('规则id必填')),
    action: Joi.string().required().error(new Error('规则必填')),
    description: Joi.string().error(new Error('规则描述格式错误')),
  });

  const remove = Joi.object().keys({
    id: Joi.number().required().error(new Error('规则id必填')),
  });

  return {
    create,
    index,
    update,
    remove,
    item: remove,
  };
};
