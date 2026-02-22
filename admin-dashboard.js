import { auth, db } from "./firebase.js";
import {
  collection, addDoc, getDocs, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
import {
  onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

/* 🔐 PROTECT */
onAuthStateChanged(auth, user => {
  if (!user) window.location.href = "admin-login.html";
});

/* DOM */
const quizDateInput = document.getElementById("quizDate");
const q_en = document.getElementById("q_en");
const q_ur = document.getElementById("q_ur");
const optA = document.getElementById("optA");
const optB = document.getElementById("optB");
const optC = document.getElementById("optC");
const optD = document.getElementById("optD");
const correct = document.getElementById("correct");
const explain = document.getElementById("explain");
const quran = document.getElementById("quran");
const hadith = document.getElementById("hadith");
const manageList = document.getElementById("manageList");

/* NAV */
window.showSection = id => {
  document.querySelectorAll(".section")
    .forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if (id === "manage") loadManage();
};

/* LOGOUT */
window.logout = () => {
  signOut(auth).then(() =>
    window.location.href = "admin-login.html"
  );
};

/* SAVE */
window.saveQuestion = async () => {
  const date = quizDateInput.value;
  if (!date) return alert("Select date");

  const ref = collection(db, "quiz", date, "questions");
  const snap = await getDocs(ref);
  if (snap.size >= 10) return alert("10 questions limit");

  await addDoc(ref, {
    question_en: q_en.value,
    question_ur: q_ur.value,
    options: [optA.value, optB.value, optC.value, optD.value],
    correct: correct.value,
    explanation: explain.value,
    quran: quran.value,
    hadith: hadith.value,
    createdAt: new Date()
  });

  alert("Saved");
};

/* MANAGE */
async function loadManage() {
  const date = quizDateInput.value;
  if (!date) return manageList.innerHTML = "Select date";

  const ref = collection(db, "quiz", date, "questions");
  const snap = await getDocs(ref);
  manageList.innerHTML = "";

  snap.forEach(d => {
    manageList.innerHTML += `
      <div>
        ${d.data().question_en}
        <button onclick="deleteQ('${date}','${d.id}')">❌</button>
      </div>`;
  });
}

window.deleteQ = async (date, id) => {
  await deleteDoc(doc(db, "quiz", date, "questions", id));
  loadManage();
};
