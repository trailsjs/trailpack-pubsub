'use strict'

const expect = require('chai').expect

describe('PubSub Trailpack', () => {

  describe('#configure', () => {
    it('should load trailpack for 2 apps', () => {
      expect(global.app.packs.pubsub).to.exist
      expect(global.app2.packs.pubsub).to.exist
    })
  })

  describe('Test pack initialization', () => {

    let pubsub
    let pubsub2

    before(() => {
      pubsub = global.app.pubsub
      pubsub2 = global.app2.pubsub
    })

    it('should be loaded', () => {
      expect(pubsub).to.be.an.object
      expect(pubsub2).to.be.an.object
    })

    it('should create 2 connections for each server', () => {
      expect(pubsub.pubClient).to.exist
      expect(pubsub.subClient).to.exist

      expect(pubsub2.pubClient).to.exist
      expect(pubsub2.subClient).to.exist
    })

    it('should have publish() method', () => {
      expect(pubsub.publish).to.be.a.function
      expect(pubsub2.publish).to.be.a.function
    })

    it('should have on() method', () => {
      expect(pubsub.on).to.be.a.function
      expect(pubsub2.on).to.be.a.function
    })
  })
})
