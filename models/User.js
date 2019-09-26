var keystone = require('keystone');

var User = new keystone.List('User');

User.add({
  displayName: { type: String },
  password: { type: keystone.Field.Types.Password },
  isAdmin: {type: Boolean, default: false},
  email: { type: keystone.Field.Types.Email, unique: true },
});

User.schema.virtual('canAccessKeystone').get(function () {
  if (this.isAdmin) return true;
});

User.defaultColumns = 'id, displayName, email';

User.register();