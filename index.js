'use strict'

const Trailpack = require('trailpack')
const _ = require('lodash')

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
  }

  /**
   * TODO document method
   */
  configure () {

  }

  /**
   * TODO document method
   */
  initialize () {
    super.initialize()
  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}
