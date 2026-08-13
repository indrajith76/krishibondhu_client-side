// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.NEXTAPP_apiKey,
  authDomain:process.env.NEXTAPP_authDomain,
  projectId:process.env.NEXTAPP_projectId,
  storageBucket:process.env.NEXTAPP_storageBucket,
  messagingSenderId:process.env.NEXTAPP_messagingSenderId,
  appId:process.env.NEXTAPP_appId,
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
