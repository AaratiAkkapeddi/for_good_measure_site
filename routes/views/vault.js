var keystone = require('keystone');
var VaultItem = keystone.list('VaultItem');
var Configuration = keystone.list('Configuration');

// module.exports = function (req, res) {
//     res.send('Hello you learner, you');
// };

module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'project';

	view.query('configuration', Configuration.model.find());
	view.query('items', VaultItem.model.find());

	view.render('vault');
  	// res.render('index');
};


//model.find().sort({name: 'criteria'}).exec(function(err, model) { ... }

