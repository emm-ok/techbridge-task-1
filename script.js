//    MOBILE NAVIGATION
const menuButton = document.getElementById("menuButton");
const mobileNavigation = document.getElementById("mobileNavigation");

const mobileNavLinks = document.querySelectorAll(
  ".mobile-nav-link, .mobile-apply",
);

function openMobileMenu() {
  menuButton.classList.add("active");
  mobileNavigation.classList.add("active");

  menuButton.setAttribute("aria-expanded", "true");

  menuButton.setAttribute("aria-label", "Close navigation");

  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  menuButton.classList.remove("active");
  mobileNavigation.classList.remove("active");

  menuButton.setAttribute("aria-expanded", "false");

  menuButton.setAttribute("aria-label", "Open navigation");

  document.body.style.overflow = "";
}

function toggleMobileMenu() {
  const isOpen = mobileNavigation.classList.contains("active");

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

menuButton.addEventListener("click", toggleMobileMenu);

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;

  const clickedInsideMenu = mobileNavigation.contains(target);

  const clickedMenuButton = menuButton.contains(target);

  const isOpen = mobileNavigation.classList.contains("active");

  if (isOpen && !clickedInsideMenu && !clickedMenuButton) {
    closeMobileMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (mobileNavigation.classList.contains("active")) {
    closeMobileMenu();

    menuButton.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    closeMobileMenu();
  }
});

//    LIGHT / DARK MODE
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("techbridge-theme");

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");

  themeToggle.setAttribute("aria-pressed", "true");
}

function updateThemeButton() {
  const isDark = document.documentElement.classList.contains("dark");

  themeToggle.setAttribute("aria-pressed", String(isDark));
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");

  localStorage.setItem("techbridge-theme", isDark ? "dark" : "light");

  updateThemeButton();
});
