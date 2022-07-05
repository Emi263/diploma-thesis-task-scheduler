// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC85-p7JGI3VndEkRlceijAbOTXBE-lEMI",
  authDomain: "fir-storage-84688.firebaseapp.com",
  projectId: "fir-storage-84688",
  storageBucket: "fir-storage-84688.appspot.com",
  messagingSenderId: "268764801680",
  appId: "1:268764801680:web:5d3846dbb23565d06d8615",
};

// Initialize Firebase

let app;

if (firebase.default.apps.length === 0) {
  app = firebase.default.initializeApp(firebaseConfig);
} else {
  app = firebase.default.app();
}

const storage = firebase.default.storage();

export { storage };
