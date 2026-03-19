const authentication = require('./authentication');
const { befores, afters } = require('./middleware');
const downloadFile = require('./creates/downloadFile');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,

  beforeRequest: [...befores],
  afterResponse: [...afters],

  triggers: {},
  searches: {},

  creates: {
    [downloadFile.key]: downloadFile,
  },

  resources: {},
};
