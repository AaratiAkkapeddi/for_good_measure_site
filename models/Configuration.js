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

var Configuration = new keystone.List('Configuration', {
  autokey: { path: 'slug', from: 'title', unique: true },
  map: { name: 'title' }
});
// image: { type: Types.File },

Configuration.add({
  index_hero_video: {type: Types.File, storage: s3_storage},
  index_hero_img_mobile: {type: Types.File, storage: s3_storage},
  home_page_info_image: {type: Types.File, storage: s3_storage},
  home_page_info_text: {type: String},
  home_page_marquee: {type:String},
  footer_blurb: { type: String}
});

Configuration.schema.virtual('canAccessKeystone').get(function () {
  return true;
});

Configuration.schema.pre('save', function (next) {
  let event = this;
  if (event.isModified('published') && event.published) {
    this.publishDate = Date.now();
  }
  return next();
});

Configuration.defaultColumns = 'title, description';

Configuration.register();