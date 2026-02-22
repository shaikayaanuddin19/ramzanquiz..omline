// ================================
// Sidebar Toggle (Hamburger Menu)
// ================================

function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");

  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
    overlay.style.display = "none";
  } else {
    menu.classList.add("open");
    overlay.style.display = "block";
  }
}

// ================================
// Close menu when clicking overlay
// ================================

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("overlay");
  const menuLinks = document.querySelectorAll("#sideMenu a");

  if (overlay) {
    overlay.addEventListener("click", function () {
      closeMenu();
    });
  }

  // Close menu when any link is clicked
  menuLinks.forEach(link => {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });
});

// ================================
// Close Menu Function
// ================================

function closeMenu() {
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");

  menu.classList.remove("open");
  overlay.style.display = "none";
}
