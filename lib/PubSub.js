'use strict'

const _ = require('lodash')
const redis = require('redis')

module.exports = class PubSub {

  constructor (config) {
    this._config = config // eslint-disable-line
    this.connected = false
    this._pubClient = null
    this._subClient = null
  }

  /**
   * Create a new connection to Redis server
   * @returns {Promise}
   */
  createConnection (config) {
    return new Promise((resolve, reject) => {
      const connection = redis.createClient(config)
      connection.on('ready', () => resolve(connection))
      connection.on('error', err => reject(err))
    })
  }

  /**
   * Create new connections
   * @returns {Promise}
   */
  connect () {
    return Promise.all([
      this.createConnection(this._config.connection),
      this.createConnection(this._config.connection)
    ])
    .then((connections) => {
      this._pubClient = connections[0]
      this._subClient = connections[1]
    })
  }

  /**
   * Will close existing connection
   * @param {Client} client
   * @returns {Promise}
   */
  closeConnection (client) {
    return new Promise((resolve, reject) => {
      client.on('end', () => resolve())
      client.on('error', (err) => reject(err))
      client.quit()
    })
  }

  /**
   * Destroy connections
   * @returns {Promise}
   */
  disconnect () {
    return Promise.all([
      this.closeConnection(this._pubClient),
      this.closeConnection(this._subClient)
    ])
  }

  /**
   * Publish client
   * @return {Client?}
   */
  get pubClient () {
    return this._pubClient
  }

  /**
   * Sub client
   * @return {Client?}
   */
  get subClient () {
    return this._subClient
  }

  /**
   * Publish message to chan
   */
  publish (eventOrData, data) {}

  /**
   * Add a handler for channel
   * @param {String} channel
   * @param {Function} cb
   */
  on (channel, cb) {
    cb = cb || _.noop
  }
}
