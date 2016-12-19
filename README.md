# trailpack-pubsub
:package: Redis Pub/Sub implementation for Trails.js app

[npm-image]: https://img.shields.io/npm/v/trailpack-pubsub.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-pubsub
[ci-image]: https://img.shields.io/travis/trailsjs/trailpack-pubsub/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/trailsjs/trailpack-pubsub
[daviddm-image]: http://img.shields.io/david/trailsjs/trailpack-pubsub.svg?style=flat-square
[daviddm-url]: https://david-dm.org/trailsjs/trailpack-pubsub
[codeclimate-image]: https://img.shields.io/codeclimate/github/trailsjs/trailpack-pubsub.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/trailsjs/trailpack-pubsub
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/trailsjs/trails

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

Provides ability to send/receive messages using Redis Pub/Sub

A pretty simple Pub/Sub system between your Trails.js applications.

## Install

```bash
$ npm install --save trailpack-pubsub
```
## Usage

### Configure
Load in your trailpack config

```javascript
// config/main.js
module.exports = {
  // ...
  packs: [
    require('trailpack-core'),
    require('trailpack-router'),
    // ...
    require('trailpack-pubsub')
  ]
}
```

### Configure connection
```javascript
// config/pubsub.js

module.exports = {
  /**
   * Redis connection settings
   * @see {@link https://github.com/NodeRedis/node_redis#rediscreateclient}
   * @type {Object}
   */
  connection: {
    host: '127.0.0.1',
    post: 6370
  },

  /**
   * Default channel that will be used to publish events if no specific channel defined
   * @type {String}
   */
  defaultChannel: 'trails-channel',

  /**
   * List of global handlers
   * @type {Object}
   */
  handlers: {

    onSubscribe: function(channel, count) {},

    onError: function (err) {},

    onMessage: function (event, message) {}
  }
}
```

Don't forget to add new config file into `config/index.js`

```javascript
exports.pubsub = require('./pubsub')
```


### Subscribing to events

Right now you could subscribe to any event anywhere in your app

```javascript
// Add a new subscription to specific event inside application
this.app.pubsub.on('event', (data) => {
  // ...
})
```

Another way to handle all events is `handlers.onMessage()` method in `config/pubsub.js`

```javascript
module.exports = {

  //...
  handlers: {

    onMessage: function (event, message) {
      // Will handle all events/messages from other apps
    }
  }
}
```

### Publish message

You could publish event to other applications using `pubsub.publish()` method

```javasctipt
this.app.pubsub.publish('some-event', { some: 'data' })
```

### Handling Errors

Right now there is only one place for handling errors in your app.

You could add `handlers.onError` function into your `config/pubsub.js` file


## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/trailsjs/trails/blob/master/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.


## License
[MIT](https://github.com/trailsjs/trailpack-mongoose/blob/master/LICENSE)
