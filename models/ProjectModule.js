
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

var ProjectModule = new keystone.List('ProjectModule', { 
  map: {name: 'title'}
});
// image: { type: Types.File },

ProjectModule.add({
  title: { type: String, required: true, initial: true },
  description: { type: Types.Html, wysiwyg: true },
  caption: { type: Types.Html, wysiwyg: true },
  design:  { type: Types.Select, options: [{ value: 1, label: 'Text Left Overlap' }, {value: '1-reversed', label: 'Text Right Overlap'}, {value: 2, label: 'Text Above Image'}, {value: 3, label:'Text Left 50/50'}, {value: '3-reversed', label:'Text Right 50/50'}, {value: 4, label:'Tiled Image'}, {value:5, label:'Text Right Bottom Corner'}, {value:6, label:'Centered Image'}, {value:7, label:'Album Module'}, 'video'] },
  image: {type: Types.File, storage: s3_storage},
  video: {type: Types.File, storage: s3_storage},
  order: {type: Types.Number},
  featured: {type: Boolean, initial: false },
  archived: {type: Boolean, initial: false },
  on_home_page: {type: Boolean, initial: false },
  tags: {type: String},
  swapFont: {type: Boolean, initial: false},
  bgcolor: { type: String, required: true, initial: "#fff" },
  link: { type: String, required: true, initial: "/" },
  lightText: {type:Boolean, initial: false },
  alt_font: {type: Boolean, initial: false },
  linkcolor: { type: String, initial: "#ff9933" },
  album_title: { type: String },
  artist_name: { type: String },
  spotify_link: { type: String },
  apple_music: { type: String },
  album_image: {type: Types.File, storage: s3_storage},
});

ProjectModule.schema.virtual('canAccessKeystone').get(function () {
  return true;
});

ProjectModule.schema.pre('save', function (next) {
  let event = this;
  if (event.isModified('published') && event.published) {
    this.publishDate = Date.now();
  }
  return next();
});

ProjectModule.defaultColumns = 'title, order, design, description';

ProjectModule.register();