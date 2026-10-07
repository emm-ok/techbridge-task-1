// MOBILE NAVIGATION
const menuButton = document.getElementById("menu-button");
const mobileNavigation = document.getElementById("mobile-navigation");

if (menuButton && mobileNavigation) {
  const mobileNavLinks = mobileNavigation.querySelectorAll("a");

  function openMobileMenu() {
    mobileNavigation.classList.add("is-open");
    menuButton.classList.add("is-open");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");

    mobileNavigation.setAttribute("aria-hidden", "false");

    document.body.classList.add("menu-open");
  }

  function closeMobileMenu() {
    mobileNavigation.classList.remove("is-open");
    menuButton.classList.remove("is-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");

    mobileNavigation.setAttribute("aria-hidden", "true");

    document.body.classList.remove("menu-open");
  }

  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();

    if (mobileNavigation.classList.contains("is-open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", (event) => {
    if (!mobileNavigation.classList.contains("is-open")) {
      return;
    }

    const clickedInsideMenu = mobileNavigation.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      mobileNavigation.classList.contains("is-open")
    ) {
      closeMobileMenu();
      menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      closeMobileMenu();
    }
  });
}

// LIGHT / DARK MODE
const themeButtons = [
  document.getElementById("theme-toggle"),
  document.getElementById("mobile-theme-toggle"),
].filter(Boolean);

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const isDark = theme === "dark";

  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(isDark));

    button.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
  });

  localStorage.setItem("techbridge-theme", theme);
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem("techbridge-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

setTheme(getInitialTheme());

themeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();

    const currentTheme = document.documentElement.getAttribute("data-theme");

    setTheme(currentTheme === "dark" ? "light" : "dark");
  });
});

// PROGRAM SWITCHER
const selectorButtons = document.querySelectorAll(".program-selector-button");

const programPanels = document.querySelectorAll(".program-detail-panel");

function selectProgram(program) {
  selectorButtons.forEach((button) => {
    const isSelected = button.dataset.program === program;

    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-selected", String(isSelected));
  });

  programPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === program;

    panel.classList.toggle("is-active", isActive);
  });
}

selectorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectProgram(button.dataset.program);
  });
});

// COMPARISON LINKS
const comparisonLinks = document.querySelectorAll("[data-select-program]");

comparisonLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const selectedProgram = link.dataset.selectProgram;

    selectProgram(selectedProgram);
  });
});

// KEYBOARD SUPPORT FOR PROGRAM TABS
selectorButtons.forEach((button, index) => {
  button.addEventListener("keydown", (event) => {
    let nextIndex = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % selectorButtons.length;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + selectorButtons.length) % selectorButtons.length;
    }

    if (nextIndex !== null) {
      event.preventDefault();

      selectorButtons[nextIndex].focus();
      selectProgram(selectorButtons[nextIndex].dataset.program);
    }
  });
});

// HASH NAVIGATION
window.addEventListener("hashchange", () => {
  if (mobileNavigation && mobileNavigation.classList.contains("is-open")) {
    mobileNavigation.classList.remove("is-open");
  }
});

// INITIAL PROGRAM
selectProgram("analytics");
