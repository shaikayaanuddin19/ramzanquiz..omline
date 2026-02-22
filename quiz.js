import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

/* 🔐 USER ID */
let userId = localStorage.getItem("quizUser");
if (!userId) {
  userId = "user_" + Math.random().toString(36).slice(2);
  localStorage.setItem("quizUser", userId);
}

/* 📅 TODAY */
const today = new Date().toLocaleDateString("en-CA");

/* STATE */
let questions = [];
let current = 0;
let answers = [];
let submitted = false;

/* DOM */
const app = document.getElementById("app");
const questionEl = document.getElementById("question");
const countEl = document.getElementById("q-count");
const optionsEls = document.querySelectorAll(".option-text");
const nextBtn = document.getElementById("nextBtn");

/* 🚫 CHECK ATTEMPT */
async function checkAttempt() {
  try {
    const ref = doc(db, "attempts", today, "users", userId);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      app.innerHTML = `
        <div style="text-align:center;padding:40px">
          <h2>⚠️ Quiz Already Attempted</h2>
          <p>Aaj ka quiz aap de chuke ho.</p>
          <p>Kal dobara aana In shaa Allah 🌙</p>
        </div>
      `;
      return true;
    }
    return false;
  } catch (e) {
    app.innerHTML = "⚠️ Network error. Refresh please.";
    return true;
  }
}

/* 🔥 LOAD QUIZ */
async function loadQuiz() {
  const blocked = await checkAttempt();
  if (blocked) return;

  const snap = await getDocs(
    collection(db, "quiz", today, "questions")
  );

  if (snap.empty) {
    app.innerHTML = "⏳ Today's quiz not available";
    return;
  }

  questions = snap.docs.map(d => d.data());
  showQuestion();
}

/* 🧠 SHOW QUESTION */
function showQuestion() {
  const q = questions[current];

  questionEl.innerText = q.question_en;
  countEl.innerText = `Question ${current + 1} of ${questions.length}`;

  optionsEls.forEach((el, i) => {
    el.innerText = q.options[i];
  });

  document
    .querySelectorAll("input[name='option']")
    .forEach(r => (r.checked = false));

  nextBtn.innerText =
    current === questions.length - 1 ? "Submit" : "Next";
}

/* 👉 NEXT / SUBMIT */
window.nextQuestion = async function () {
  if (submitted) return;

  const selected = document.querySelector(
    "input[name='option']:checked"
  );

  if (!selected) {
    alert("Please select an option");
    return;
  }

  answers.push(selected.value);
  current++;

  if (current < questions.length) {
    showQuestion();
    return;
  }

  /* RESULT */
  const optionMap = ["A", "B", "C", "D"];
  let score = 0;
  let resultAnswers = [];

  questions.forEach((q, i) => {
    const userAns = optionMap[parseInt(answers[i])];
    if (userAns === q.correct) score++;

    resultAnswers.push({
      question: q.question_en,
      userAnswer: userAns,
      correctAnswer: q.correct,
      proof: q.explanation || q.quran || "—"
    });
  });

  /* SAVE */
  await setDoc(
    doc(db, "attempts", today, "users", userId),
    {
      score,
      answers: resultAnswers,
      submittedAt: serverTimestamp()
    }
  );

  submitted = true;
  window.location.href = "result.html";
};

/* 🔒 BACK BUTTON BLOCK */
history.pushState(null, null, location.href);
window.onpopstate = () => history.go(1);

/* START */
loadQuiz();





