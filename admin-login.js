import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

window.adminLogin = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // ✅ YAHI CONNECTION HAI
      window.location.href = "admin-dashboard.html";
    })
    .catch((error) => {
      errorMsg.innerText = error.message;
    });
};
