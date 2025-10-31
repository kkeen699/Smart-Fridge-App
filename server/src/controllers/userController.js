const { admin, db } = require('../services/firebaseService');

const createUser = async (req, res) => {
  const userId = req.user.uid;

  try {
    const userRef = db.collection('users').doc(userId);

    await userRef.set({
      userId: userId,
      // Server-side timestamp for creation
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // SEND SUCCESS RESPONSE
    res.status(201).send({
      message: 'User successfully created.',
      userId: userId
    });

  } catch (firestoreError) {
    console.error('Error creating user in Firestore:', firestoreError);
    res.status(500).send({
      error: 'Internal Server Error: Failed to write user to database.'
    });
  }
};

module.exports = { createUser };
