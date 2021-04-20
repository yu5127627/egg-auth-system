module.exports = app => {
    const Joi = app.Joi;

    const create = Joi.object().keys({
        action: Joi.string().required().error(new Error('规则格式错误')),
        description: Joi.string().required().error(new Error('规则描述不存在'))
    })

    return {
        create
    }
}