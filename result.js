import { db } from "./firebase.js";
import { doc, getDoc } from
"https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

/* 🔑 USER ID */
let userId = localStorage.getItem("quizUser");

/* 📅 TODAY DATE (SAME FORMAT AS QUIZ) */
const today = new Date().toLocaleDateString("en-CA");

/* 📦 DOM */
const scoreBox = document.getElementById("scoreBox");
const answerBox = document.getElementById("answerBox");
const scoreText = document.getElementById("scoreText");

/* 📥 LOAD RESULT FROM FIREBASE */
let quizAnswers = [];
let finalScore = 0;
let total = 10;

async function loadResult() {
  if (!userId) {
    document.body.innerHTML = "❌ User not found";
    return;
  }

 const ref = doc(db, "attempts", today, "users", userId);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    document.body.innerHTML = "❌ Result not found";
    return;
  }

  const data = snap.data();
  finalScore = data.score;
  quizAnswers = data.answers;
}

loadResult();

/* ⭐ SHOW SCORE */
window.showScore = function () {
  answerBox.classList.add("hidden");
  scoreBox.classList.remove("hidden");

  scoreText.innerText = `${finalScore} out of ${total}`;
};

/* 📝 SHOW ANSWERS */
window.showAnswers = function () {
  scoreBox.classList.add("hidden");
  answerBox.classList.remove("hidden");
  answerBox.innerHTML = "";

  quizAnswers.forEach((q, i) => {
    const isCorrect = q.userAnswer === q.correctAnswer;

    answerBox.innerHTML += `
      <div class="question">
        <strong>Q${i + 1}. ${q.question}</strong><br>
        Your Answer: ${q.userAnswer}<br>
        Correct Answer: ${q.correctAnswer}<br>
        <span class="${isCorrect ? "correct" : "wrong"}">
          ${isCorrect ? "✅ Correct" : "❌ Wrong"}
        </span>
        <div class="proof">📖 ${q.proof}</div>
      </div>
    `;
  });
};
