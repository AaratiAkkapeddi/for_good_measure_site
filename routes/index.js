var keystone = require('keystone');
var importRoutes = keystone.importer(__dirname);


var routes = {
  views: importRoutes('./views'),
  api: importRoutes('./api'),
};

exports = module.exports = function (app) {
  app.get('/', routes.views.index)
  app.get('/work', routes.views.work)
  app.get('/info', routes.views.info)
  app.get('/vault', routes.views.vault)
  app.get('/pages/:pageslug', routes.views.page)
};