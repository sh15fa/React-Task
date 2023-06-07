import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyA0vVvVeKmTAjOLAtAEhlv3w-szVWFytrI",
  authDomain: "react-7ee1b.firebaseapp.com",
  projectId: "react-7ee1b",
  storageBucket: "react-7ee1b.appspot.com",
  messagingSenderId: "50019170678",
  appId: "1:50019170678:web:24bd57670c0409fee6a257"
};

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);