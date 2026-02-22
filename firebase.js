import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBF1t3yiMITzvi3xIhEl2QKT97LDCQSx18",
  authDomain: "ramzan-quiz-43aae.firebaseapp.com",
  projectId: "ramzan-quiz-43aae",
  storageBucket: "ramzan-quiz-43aae.firebasestorage.app",
  messagingSenderId: "989458450549",
  appId: "1:989458450549:web:8a302a2d1f84416413d03c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
