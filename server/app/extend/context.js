
module.exports = {
  resBody(op = {}) {
    this.body = {
      code: op.code || 200,
      message: op.message || '操作成功',
      result: op.result,
    };
  },
  errBody(op = {}) {
    this.body = {
      code: op.code || 500,
      message: op.message || '操作异常',
    };
  },
};
