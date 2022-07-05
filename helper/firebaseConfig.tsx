import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAab9SrMDNp8NUEZ7diaqi7So1qxJXfgd4",
  authDomain: "expo-app-5720d.firebaseapp.com",
  projectId: "expo-app-5720d",
  storageBucket: "expo-app-5720d.appspot.com",
  messagingSenderId: "969278328047",
  appId: "1:969278328047:web:e0dcd5f6654b1651b51f1a",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
