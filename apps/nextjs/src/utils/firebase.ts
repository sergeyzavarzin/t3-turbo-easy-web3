import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSXV3zZnYBrm6QFsbKSwwVnB3-TE1-3J8",
  authDomain: "spirit-dev-9b50a.firebaseapp.com",
  projectId: "spirit-dev-9b50a",
  storageBucket: "spirit-dev-9b50a.appspot.com",
  messagingSenderId: "441390145031",
  appId: "1:441390145031:web:9cbcbfc8340678f99e14a2",
  measurementId: "G-4M4088PDBX",
};

export const firebaseApp = initializeApp(firebaseConfig);

const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getIdToken = async () => {
  const loginRes = await signInWithGoogle();

  return loginRes.user.getIdToken(true); // this idToken will be passed to web3auth
};
