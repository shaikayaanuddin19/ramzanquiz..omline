/* ================================
   ELEMENT REFERENCES
================================ */
const menu = document.getElementById("menu");
const menuBtn = document.querySelector(".menu-btn");

/* ================================
   SIDEBAR TOGGLE
================================ */
function toggleMenu() {
    if (menu.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
}

function openMenu() {
    menu.classList.add("open");
}

function closeMenu() {
    menu.classList.remove("open");
}

/* ================================
   CLOSE SIDEBAR ON OUTSIDE CLICK
================================ */
document.addEventListener("click", function (event) {
    const clickInsideMenu = menu.contains(event.target);
    const clickOnMenuBtn = menuBtn.contains(event.target);

    if (!clickInsideMenu && !clickOnMenuBtn && menu.classList.contains("open")) {
        closeMenu();
    }
});

/* ================================
   LANGUAGE SWITCH SYSTEM
================================ */
function setLanguage(lang) {

    // Change all translatable text
    document.querySelectorAll("[data-en]").forEach(element => {
        element.innerHTML = element.getAttribute(`data-${lang}`);
    });

    // Direction & alignment
    if (lang === "ur") {
        document.documentElement.lang = "ur";
        document.body.style.direction = "rtl";
        document.body.style.textAlign = "right";
    } else {
        document.documentElement.lang = "en";
        document.body.style.direction = "ltr";
        document.body.style.textAlign = "center";
    }

    // Save preference
    localStorage.setItem("siteLanguage", lang);
}

/* ================================
   LOAD SAVED LANGUAGE ON REFRESH
================================ */
document.addEventListener("DOMContentLoaded", function () {
    const savedLang = localStorage.getItem("siteLanguage") || "en";
    setLanguage(savedLang);
});
function startQuiz(){
    window.location.href = "quiz.html";
}



document.body.style.textAlign = "right"; // ur
document.body.style.textAlign = "center"; // en