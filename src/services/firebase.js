import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBfZzMemSDg0mJnTT28SLzH4gnW2M-q3fY",
  authDomain: "nuklai-voting-demo.firebaseapp.com",
  projectId: "nuklai-voting-demo",
  storageBucket: "nuklai-voting-demo.appspot.com",
  messagingSenderId: "683316460323",
  appId: "1:683316460323:web:0b62bda7b9abb3a255ea96",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };