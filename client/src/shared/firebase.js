// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from  "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjzH8vUx7c4Myq862J-8FfPnbCRTAW76g",
  authDomain: "langngheimages.firebaseapp.com",
  databaseURL: "gs://langngheimages.appspot.com/",
  projectId: "langngheimages",
  storageBucket: "langngheimages.appspot.com",
  messagingSenderId: "810313852988",
  appId: "1:810313852988:web:6879c65def1b9e481ebb39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage  = getStorage(app)