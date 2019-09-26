var keystone = require('keystone');
var Project = keystone.list('ProjectModule');
var Configuration = keystone.list('Configuration');

// module.exports = function (req, res) {
//     res.send('Hello you learner, you');
// };

module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'project';

	view.query('configuration', Configuration.model.find());
	view.query('projects', Project.model.find().where('on_home_page', true).sort('order'));

	view.render('index');
  	// res.render('index');
};


//model.find().sort({name: 'criteria'}).exec(function(err, model) { ... }

