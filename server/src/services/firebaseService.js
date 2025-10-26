// Firebase Admin SDK initialization for Node.js backend
const admin = require('firebase-admin');

// Use environment variable for service account key JSON
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: serviceAccount
      ? admin.credential.cert(serviceAccount)
      : admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

const auth = admin.auth();
const db = admin.firestore();

module.exports = {
  admin,
  auth,
  db,
};