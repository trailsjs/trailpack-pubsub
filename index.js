'use strict'

const Trailpack = require('trailpack')
const _ = require('lodash')
const PubSub = require('./lib/PubSub')

module.exports = class PubSubTrailpack extends Trailpack {

  /**
   * Validate config
   */
  validate () {
    if (!this.app.config.pubsub){
      return Promise.reject(
        new Error('There no pubsub.js under ./config,' +
          'check it\'s load in ./config/index.js or create it !')
      )
    }
    if (!_.isString(this.app.config.pubsub.defaultChannel)) {
      return Promise.reject(
        new Error('Please provide `defaultChannel` for pubsub trailpack')
      )
    }

    if (!_.isObject(this.app.config.pubsub.connection)) {
      return Promise.reject(
        new Error('Please provide an connection options')
      )
    }
  }

  /**
   * Configure base settings
   */
  configure () {
    if (!this.app.config.pubsub.defaultChannel)
      this.app.config.pubsub.defaultChannel = 'trails-default'

    if (!_.isObject(this.app.config.pubsub.handlers)) {
      this.app.config.pubsub.handlers = {
        onMessage: _.noop,
        onError: _.noop
      }
    }
  }

  /**
   * Initialize connections
   */
  initialize () {
    super.initialize()
    this.app.pubsub = new PubSub(this.app.config.pubsub)

    // Call connect
    return this.app.pubsub.connect()
  }

  /**
   * Will destroy all connections
   */
  unload () {
    if (!this.app.pubsub)
      return Promise.resolve()

    return this.app.pubsub.disconnect()
  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}
