'use strict'

const expect = require('chai').expect

describe('Events tests :: ', () => {

  let pubsub
  let pubsub2

  before(() => {
    pubsub = global.app.pubsub
    pubsub2 = global.app2.pubsub
  })

  it('should subscribe and receive events inside one instance', () => {
    return new Promise((resolve, reject) => {
      pubsub.on('test', (message) => {
        expect(message).to.be.an.object
        expect(message.test).to.be.eq(1)
        resolve()
      })
      pubsub.publish('test', { test: 1 })
    })
  })

  it('should receive events on both instances', () => {
    const message = {}
    const promise1 = new Promise((resolve, reject) => {
      pubsub.on('channel', (msg) => {
        try {
          expect(msg).to.be.eql(message)
          resolve()
        }
        catch (err) {
          reject(err)
        }
      })
    })

    const promise2 = new Promise((resolve, reject) => {
      pubsub2.on('channel', (msg) => {
        try {
          expect(msg).to.be.eql(message)
          resolve()
        }
        catch (err) {
          reject(err)
        }
      })
    })

    pubsub.publish('channel', message)

    return Promise.all([
      promise1,
      promise2
    ])
  })


})
