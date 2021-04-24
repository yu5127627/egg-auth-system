const jwt = require('jsonwebtoken');

module.exports = {
  //  解密token
  verifyToken(id, secret) {
    return jwt.verify(id, secret, function(err, decoded) {
      if (err) {
        return null;
      }
      return decoded;
    });
  },
  //  创建加密token
  createToken(data, secret) {
    return jwt.sign(
      { id: data }, secret,
      {
        expiresIn: 60 * 60,
      });
  },
};
