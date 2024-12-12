const admin = require('firebase-admin');
const serviceAccount = require('../credentials/firebase-key.json');
const userController = require('../controllers/userController');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.header("authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No se proporcionó un token" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.uid = decodedToken.uid;
    req.email = decodedToken.email; 
    await userController.registerUserIfNotExists(req, res, next); 
  } catch (error) {
    console.error("Token no válido:", error);
    res.status(401).json({ message: "Token no válido" });
  }
};

module.exports = verifyFirebaseToken;
/* const admin = require('../admin/admin'); // Update the path to your Firebase Admin setup

const verifyFirebaseToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.uid = decodedToken.uid; // Add user ID to request object
    next();
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = verifyFirebaseToken;
 */