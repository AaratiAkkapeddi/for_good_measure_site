var keystone = require('keystone');
var Types = keystone.Field.Types;

var PageModule = new keystone.List('PageModule');
// image: { type: Types.File },
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

PageModule.add({
  text: { type: Types.Html, wysiwyg: true },
  caption: { type: Types.Html, wysiwyg: true },
  design:  { type: Types.Select, options: [{value: 1, label:'Text Left 50/50'},{value: '1-reversed', label:'Text Right 50/50'}, {value:2, label:'Full Bleed Image'}, {value:'double', label:'Two Images'}, {value:4, label:'Text Left 30/60'}, {value:'4-reversed', label:'Text Right 30/60'}, 'video'] },
  order: {type: Types.Number},
  page: { type: Types.Relationship, ref: 'Page' },
  image: {type: Types.File, storage: s3_storage},
  video: {type: Types.File, storage: s3_storage},
  secondImage: {type: Types.File, storage: s3_storage},
  lighttext: {type: Boolean, initial: false },
  bgcolor: { type: String, required: true, initial: "#fff" },
  swapFont: {type: Boolean, initial: false }
});

PageModule.schema.virtual('canAccessKeystone').get(function () {
  return true;
});

PageModule.schema.pre('save', function (next) {
  let event = this;
  if (event.isModified('published') && event.published) {
    this.publishDate = Date.now();
  }
  return next();
});

PageModule.defaultColumns = 'page, order, design';

PageModule.register();