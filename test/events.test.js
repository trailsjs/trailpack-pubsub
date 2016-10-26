'use strict'

const expect = require('chai').expect

describe('Events tests :: ', () => {

  let pubsub

  before(() => {
    pubsub = global.app.pubsub
  })

  it('Should subscribe and receive events', () => {
    return new Promise((resolve, reject) => {
      pubsub.on('test', (message) => {
        expect(message).to.be.an.object
        expect(message.test).to.be.eq(1)
        resolve()
      })
      pubsub.publish('test', { test: 1 })
    })
  })
})
