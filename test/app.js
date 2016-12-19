'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')

exports.appConfig = _.defaultsDeep({
  pkg: {
    name: 'pubsub-trailpack-test'
  },
  api: {},
  config: {
    log: {
      logger: new smokesignals.Logger('error')
    },
    pubsub: {
      connection: {
        host: '127.0.0.1',
        port: 6379
      }
    },
    main: {
      packs: [
        require('trailpack-core'),
        require('../') // trailpack-pubsub
      ]
    },
    web: {
      port: 3000
    }
  }
}, smokesignals.FailsafeConfig)


exports.app2Config = _.defaultsDeep({
  pkg: {
    name: 'pubsub-trailpack-test'
  },
  api: {},
  config: {
    log: {
      logger: new smokesignals.Logger('error')
    },
    pubsub: {
      connection: {
        host: '127.0.0.1',
        port: 6379
      }
    },
    main: {
      packs: [
        require('trailpack-core'),
        require('../') // trailpack-pubsub
      ]
    },
    web: {
      port: 3001
    }
  }
}, smokesignals.FailsafeConfig)
