var keystone = require('keystone');
var Page = keystone.list('Page');
var PageModule = keystone.list('PageModule');
exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// Init locals

	locals.filters = {
		page: req.params.pageslug,
	};
	console.log(req.params.name)
	console.log('--------------')
	// view.on('init', function (next) {
		// var locals = res.locals;

		locals.section = 'page';

		// var q = Page.model.findOne({
		// 	key: locals.filters.page,
		// })
		var id;
		view.query('page', Page.model.findOne({slug: req.params.pageslug}));
		Page.model.findOne({slug: req.params.pageslug}).then(function(page) {
	       id = page.id;
	        console.log('*********')
			console.log(id)
		// var mypage = Page.model.findOne({slug: req.params.pageslug})
			view.query('modules', PageModule.model.find().where('page', id).sort('order'))
			view.render('page');
	    })


		// q.exec(function (err, result) {
		// 	locals.page = result;
		// 	next(err);
		// });

	// });




};
	// Render the view

