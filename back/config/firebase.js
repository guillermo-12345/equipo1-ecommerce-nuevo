const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

module.exports = getAuth();
