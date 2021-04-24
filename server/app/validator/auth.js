module.exports = app => {
  const Joi = app.Joi;

  const login = Joi.object().keys({
    username: Joi.string().required().error(new Error('用户名必填')),
    password: Joi.string().required().error(new Error('密码必填')),
  });

  return {
    login,
  };
};
