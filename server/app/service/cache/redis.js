const { Service } = require('egg');

class RedisService extends Service {
  /**
   * redis数据存储，所有数据均存储为序列化json字符串
   * @param {string} key 键名
   * @param {object} val 键值
   * @param {number} expir 有效期
   */
  async set(key, val, expir = 0) {
    const { redis } = this.app;
    if (expir === 0) {
      return await redis.set(key, JSON.stringify(val));
    }
    return await redis.set(key, JSON.stringify(val), 'EX', expir);
  }

  /**
   * 获取缓存的值
   * @param {string} key 键名
   */
  async get(key) {
    const dbRedis = await this.app.redis.get(key);
    return JSON.parse(dbRedis);
  }
}

module.exports = RedisService;
