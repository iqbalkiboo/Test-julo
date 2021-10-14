import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAmjtwJhPPoQjHg-o_EjC-aiSCtmGzJtzQ",
  authDomain: "movie-list-3d942.firebaseapp.com",
  databaseURL: "https://movie-list-3d942.firebaseio.com",
  projectId: "movie-list-3d942",
  storageBucket: "movie-list-3d942.appspot.com",
  messagingSenderId: "1080619382778",
  appId: "1:1080619382778:web:76dafc6c33618e08ba5643",
  measurementId: "G-LQSSR2GBPF"
};

app.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();
export { db, auth };