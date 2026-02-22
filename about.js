function setLang(lang) {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = el.getAttribute("data-" + lang);
  });
  localStorage.setItem("siteLang", lang);
}

window.onload = () => {
  const savedLang = localStorage.getItem("siteLang") || "en";
  setLang(savedLang);
};



function toggleMenu(){
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");

  if(menu.style.right === "0px"){
    menu.style.right = "-260px";
    overlay.style.display = "none";
  } else {
    menu.style.right = "0px";
    overlay.style.display = "block";
  }
}
