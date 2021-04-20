module.exports = app => {
    const Joi = app.Joi;
    const create = Joi.object().keys({
        username: Joi.string().email().error(new Error('用户名格式不正确')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('密码格式不正确')),
        roleId: Joi.number().required().error(new Error('角色格式不正确'))
    });
    const update = Joi.object().keys({
        id: Joi.number().required().error(new Error('缺少用户id')),
        username: Joi.string().required().error(new Error('用户名格式不正确')),
        roleId: Joi.number().required().error(new Error('角色格式不正确'))
    });

    const deleteMany = Joi.object().keys({});
    const findById = Joi.object().keys({});
    return {
        create,
        update
    }
};