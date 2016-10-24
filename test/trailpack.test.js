'use strict'

const expect = require('chai').expect

describe('PubSub Trailpack', () => {
  let pack
  before(() => {
    pack = global.app.packs.pubsub
  })

  describe('#configure', () => {
    it('should load trailpack', () => {
      expect(pack).to.exist
    })
  })

  describe('Test pack initialization', () => {

    let pubsub

    before(() => {
      pubsub = global.app.pubsub
    })

    it('should be loaded', () => {
      expect(pubsub).to.be.an.object
    })

    it('should create 2 connections', () => {
      expect(pubsub.pubClient).to.exist
      expect(pubsub.pubClient).to.exist
    })

    it('should have publish() method', () => {
      expect(pubsub.publish).to.be.a.function
    })

    it('should have on() method', () => {
      expect(pubsub.on).to.be.a.function
    })
  })
})
