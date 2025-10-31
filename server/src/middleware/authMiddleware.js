const { auth } = require('../services/firebaseService');

/**
 * Middleware function to verify the Firebase ID Token (JWT) from the Authorization header.
 * If valid, attaches the decoded token (including UID) to req.user.
 */
const verifyIdToken = async (req, res, next) => {
    // 1. Get the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Auth Error: Missing or improperly formatted Authorization header.');
        return res.status(401).send({ error: 'Unauthorized: No token provided.' });
    }

    // 2. Extract the ID Token
    const idToken = authHeader.split('Bearer ')[1];

    try {
        // 3. Verify the ID Token using the Firebase Admin SDK
        const decodedToken = await auth.verifyIdToken(idToken);

        // 4. Attach the verified user data to the request object
        req.user = decodedToken; 
        
        // 5. Continue to the next middleware or route handler
        next(); 

    } catch (error) {
        // Handle specific verification errors (e.g., token expired, invalid signature)
        console.error('Auth Error: Token verification failed:', error.message);
        return res.status(401).send({ error: 'Unauthorized: Invalid or expired token.' });
    }
};

module.exports = verifyIdToken;
