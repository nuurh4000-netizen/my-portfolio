const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-icon");
const mobileMenu = document.querySelector(".mobaile-menu");

if (menuToggle && mobileMenu) {
    function setMenuOpen(isOpen) {
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    }

    menuToggle.addEventListener("click", () => {
        setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    mobileMenu.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });
}

if (themeToggle) {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const useLightTheme = savedTheme ? savedTheme === "light" : prefersLight;

    function setTheme(isLight) {
        document.body.classList.toggle("theme-light", isLight);
        themeToggle.setAttribute("aria-pressed", String(isLight));
        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );
        themeToggle.innerHTML = isLight
            ? '<i class="fa-solid fa-moon" aria-hidden="true"></i><span>Dark</span>'
            : '<i class="fa-solid fa-sun" aria-hidden="true"></i><span>Light</span>';
    }

    setTheme(useLightTheme);

    themeToggle.addEventListener("click", () => {
        const isLight = !document.body.classList.contains("theme-light");
        setTheme(isLight);
        localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
    });
}