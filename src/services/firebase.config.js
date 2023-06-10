import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyBB_9kgttU6vXKdPZINaQFXDiOdJUqsLOE",
  authDomain: "react-6ef7f.firebaseapp.com",
  projectId: "react-6ef7f",
  storageBucket: "react-6ef7f.appspot.com",
  messagingSenderId: "16358922360",
  appId: "1:16358922360:web:bbf048ea6f802c924df58d"
};

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);