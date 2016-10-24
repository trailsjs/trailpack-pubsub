'use strict'

const assert = require('assert')

describe('PubSub Trailpack', () => {
  let pack
  before(() => {
    pack = global.app.packs.pubsub
  })

  describe('#configure', () => {
    it('should load trailpack', () => {
      assert(pack)
    })
  })
})
