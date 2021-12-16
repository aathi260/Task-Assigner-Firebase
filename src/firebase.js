import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDvdhUepHdG7BZg75G6YwvRapU2s_eC1h0",
  authDomain: "task-assigner-97055.firebaseapp.com",
  databaseURL:
    "https://task-assigner-97055-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "task-assigner-97055",
  storageBucket: "task-assigner-97055.appspot.com",
  messagingSenderId: "1016414925468",
  appId: "1:1016414925468:web:18e1f7117c2f89b854b359",
});

const db = getFirestore(firebaseApp);
const collectionRef = collection(db, "addTask");

export {
  addDoc,
  deleteDoc,
  doc,
  db,
  collectionRef,
  orderBy,
  onSnapshot,
  query,
  serverTimestamp,
};
