// Initializes the `messages` service on path `/api/messages`
const createService = require('feathers-nedb');
const createModel = require('../../models/messages.model');
const hooks = require('./messages.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'messages',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/messages', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/messages');

  service.hooks(hooks);
};
