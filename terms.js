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

document.addEventListener("DOMContentLoaded", function(){
  const overlay = document.getElementById("overlay");
  const links = document.querySelectorAll("#sideMenu a");

  overlay.addEventListener("click", closeMenu);

  links.forEach(link => {
    link.addEventListener("click", closeMenu);
  });
});

function closeMenu(){
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");
  menu.classList.remove("open");
  overlay.style.display = "none";
}
