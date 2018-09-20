var Immutable = require('immutable')
var Serialize = require('remotedev-serialize')
var reduxPersist = require('@connected-home/redux-persist')

module.exports = function (config) {
  config = config || {}

  var serializer =  Serialize.immutable(Immutable, config.records)

  return reduxPersist.createTransform(
    serializer.stringify,
    (data, key, state) => {
      const serialised = typeof data === 'object' ? JSON.stringify(data) : data;
      return serializer.parse(serialised, key, state);
  }, 
  config);
}
