var keystone = require('keystone');

keystone.init({
  'cookie secret': 'secure string goes here',
  'name': 'my-project',
  'user model': 'User',
  'auto update': true,
  'auth': true,
  'views': 'templates/views',
  'view engine': 'pug',
  'static': ['public'],
});

keystone.import('models');

keystone.set('routes', require('./routes'));

keystone.start();

// var s3_storage = new keystone.Storage({
//   adapter: require('keystone-storage-adapter-s3'),

//     bucket: '4goodmeasure', // required; defaults to process.env.S3_BUCKET
//     region: 'us-east-2', // optional; defaults to process.env.S3_REGION, or if that's not specified, us-east-1
//     path: '/', // optional; defaults to "/"
//     headers: {
//             'x-amz-acl': 'public-read', // add default headers; see below for details
//         }
//   },
//   schema: {
//     bucket: true, // optional; store the bucket the file was uploaded to in your db
//     etag: true, // optional; store the etag for the resource
//     path: true, // optional; store the path of the file in your db
//     url: true, // optional; generate & store a public URL
//   },
// });
