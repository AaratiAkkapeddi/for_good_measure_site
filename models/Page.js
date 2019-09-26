var keystone = require('keystone');
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
var Types = keystone.Field.Types;

var Page = new keystone.List('Page', {
  autokey: { path: 'slug', from: 'title', unique: true },
  map: { name: 'title' }
});
// image: { type: Types.File },

Page.add({
  title: { type: String, required: true, initial: true },
  description: { type: Types.Html, wysiwyg: true },
  banner_design:  { type: Types.Select, options: [{value:1, label:'Text Left Overlap'}, {value:2, label:'Centered Text and Image'}, {value:3,label:'Text Left Image Center'}, {value:4,label:'Image Left Text Overlap'}] },
  banner_img: {type: Types.File, storage: s3_storage},
  project_tags: { type: String },
  banner_bg_color: {type: String},
  lighttext: {type: Boolean, initial: false },
  banner_arrow_color: {type: String},
  project_overview: { type: Types.Html, wysiwyg: true },
  project_credits: { type: Types.Html, wysiwyg: true },
  next_project_title: { type: String, required: true, initial: true },
  next_project_link: { type: String, required: true, initial: true },
  next_project_description: { type: Types.Html, wysiwyg: true },
  next_project_image: {type: Types.File, storage: s3_storage}
});

Page.schema.virtual('canAccessKeystone').get(function () {
  return true;
});

Page.schema.pre('save', function (next) {
  let event = this;
  if (event.isModified('published') && event.published) {
    this.publishDate = Date.now();
  }
  return next();
});

Page.relationship({ path: 'page-modules', ref: 'PageModule', refPath: 'page' });

Page.defaultColumns = 'title, description';

Page.register();