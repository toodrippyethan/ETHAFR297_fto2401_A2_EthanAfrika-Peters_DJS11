import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClpm1roirWi3BY7IV7gVGHyUbE_wJSWD8",
  authDomain: "ethan-podcast-app.firebaseapp.com",
  projectId: "ethan-podcast-app",
  storageBucket: "ethan-podcast-app.appspot.com",
  messagingSenderId: "818254363534",
  appId: "1:818254363534:web:4115ddb015bb5c700ec2df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };
