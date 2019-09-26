var keystone = require('keystone');
var AboutPage = keystone.list('AboutPage');

// module.exports = function (req, res) {
//     res.send('Hello you learner, you');
// };

module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'project';

	view.query('about', AboutPage.model.find());

	view.render('info');
  	// res.render('index');
};