var keystone = require('keystone');
var Types = keystone.Field.Types;
var s3_storage = new keystone.Storage({
  adapter: require('keystone-storage-adapter-s3'),
  s3: {
    key: 
process.env.S3_KEY, // required; defaults to 
    secret: 
process.env.S3_SECRET, // required; defaults to 
    bucket: '4goodmeasure', // required; defaults to process.env.S3_BUCKET
    region: 'us-east-2', // optional; defaults to process.env.S3_REGION, or if that's not specified, us-east-1
    path: '/', // optional; defaults to "/"
    headers: {
            'x-amz-acl': 'public-read', // add default headers; see below for details
        }
  },
  schema: {
    bucket: true, // optional; store the bucket the file was uploaded to in your db
    etag: true, // optional; store the etag for the resource
    path: true, // optional; store the path of the file in your db
    url: true, // optional; generate & store a public URL
  },
});

var AboutPage = new keystone.List('AboutPage', {
  autokey: { path: 'slug', from: 'title', unique: true },
  map: { name: 'title' }
});
// image: { type: Types.File },

AboutPage.add({
	about_fgm_text: { type: Types.Html, wysiwyg: true},
	contact_email: { type: String},
	banner_image: {type: Types.File, storage: s3_storage},
	continued_text: { type: Types.Html, wysiwyg: true},
	company_overview_image: {type: Types.File, storage: s3_storage},
	company_overview_text: { type: Types.Html, wysiwyg: true},
	select_clients: { type: Types.Html, wysiwyg: true},
	teaching_lectures:{ type: Types.Html, wysiwyg: true},
	awards_press: { type: Types.Html, wysiwyg: true},
	job_blurb: { type: Types.Html, wysiwyg: true},
	currently_looking: { type: Types.Html, wysiwyg: true},
	fortnight: { type: Types.Html, wysiwyg: true},
	
});

AboutPage.schema.virtual('canAccessKeystone').get(function () {
  return true;
});

AboutPage.schema.pre('save', function (next) {
  let event = this;
  if (event.isModified('published') && event.published) {
    this.publishDate = Date.now();
  }
  return next();
});

AboutPage.defaultColumns = 'title, description';

AboutPage.register();