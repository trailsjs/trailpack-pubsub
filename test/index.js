'use strict'

const TrailsApp = require('trails')

before(() => {
  global.app = new TrailsApp(require('./app').appConfig)
  global.app2 = new TrailsApp(require('./app').app2Config)

  return Promise.all([
    global.app.start(),
    global.app2.start()
  ])
})

after(() => {
  return Promise.all([
    global.app.stop(),
    global.app2.stop()
  ])
})
