var keystone = require('keystone');
var Project = keystone.list('ProjectModule');

// module.exports = function (req, res) {
//     res.send('Hello you learner, you');
// };

module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'project';

	view.query('featureds', Project.model.find().where('featured', true).sort('order'));
	view.query('archiveds', Project.model.find().where('archived', true).sort('order'));

	view.render('work');
  	// res.render('index');
};


//model.find().sort({name: 'criteria'}).exec(function(err, model) { ... }

