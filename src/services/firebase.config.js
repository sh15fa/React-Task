import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyBXEFsuit1Xcqp09hAH_u82sbN4320T3HE",
  authDomain: "react-15-7e235.firebaseapp.com",
  databaseURL: "https://react-15-7e235-default-rtdb.firebaseio.com",
  projectId: "react-15-7e235",
  storageBucket: "react-15-7e235.appspot.com",
  messagingSenderId: "385598586219",
  appId: "1:385598586219:web:36bd1c153c2fe5f982602e"
};

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);