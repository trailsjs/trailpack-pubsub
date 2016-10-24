/**
 * Redis Pub/Sub Configuration
 * (app.config.pubsub)
 *
 * Configure the Redis Pub/Sub layer, connections, events, etc.
 */
module.exports = {

  /**
   * Redis connection settings
   * @see {@link https://github.com/NodeRedis/node_redis#rediscreateclient}
   * @type {Object}
   */
  connection: {
    host: '127.0.0.1',
    post: 6370
  },

  /**
   * Default channel that will be used to publish events if no specific channel defined
   * @type {String}
   */
  defaultChannel: 'trails-channel',

  /**
   * List of global handlers
   * @type {Object}
   */
  handlers: {

    onSubscribe: function(channel, count) {},

    onError: function (err) {},

    onMessage: function (channel, message) {}
  }
}
