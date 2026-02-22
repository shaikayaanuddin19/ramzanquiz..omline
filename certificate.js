function openForm(){
  document.getElementById("formBox").style.display = "block";
  window.scrollTo({
    top: document.getElementById("formBox").offsetTop - 20,
    behavior: "smooth"
  });
}

/* Sidebar JS */
function toggleMenu(){
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");

  if(menu.classList.contains("open")){
    menu.classList.remove("open");
    overlay.style.display = "none";
  } else {
    menu.classList.add("open");
    overlay.style.display = "block";
  }
}
