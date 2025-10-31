import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

// Your Firebase configuration (you can use your production/real config here, 
// but the connectAuthEmulator call will force it to use the local emulator)
const firebaseConfig = {
  projectId: "fir-smart-fridge",

  // The rest of the fields can be placeholders since they are bypassed by the emulators
  apiKey: "placeholder-api-key",
  authDomain: "placeholder-domain.firebaseapp.com",
  storageBucket: "placeholder-storage.appspot.com",
  appId: "1:000000000000:web:0000000000000000000000"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

connectAuthEmulator(auth, "http://localhost:9099");


export { app, auth };
