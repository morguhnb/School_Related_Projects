import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {

  apiKey: "AIzaSyCbo4sYGIHJgwcOnpF9_WNiSjJ5g2L8oCY",
  authDomain: "inventoryapp-3823d.firebaseapp.com",
  projectId: "inventoryapp-3823d",
  storageBucket: "inventoryapp-3823d.appspot.com",
  messagingSenderId: "785954495806",
  appId: "1:785954495806:web:5265b581601d362f49206f",
  measurementId: "G-PYB4656PR7"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
console.log(db);