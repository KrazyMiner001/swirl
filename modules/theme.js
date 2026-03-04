import { flavors } from "https://esm.sh/@catppuccin/palette";
import Cookies from "https://esm.sh/js-cookie"

const ThemeColors = {
  dark_theme_indicator: "/assets/dark_theme.svg",
  light_theme_indicator: "/assets/light_theme.svg",
}


const DEFAULT_THEME = false;
function setTheme() {
  testCookie();
  let isDark = getCookie();

  let catppuccinTheme = isDark ? "frappe" : "latte";

  if (isDark) {
    document.getElementById("themeChangeImage").src = ThemeColors.dark_theme_indicator
  } else {
    document.getElementById("themeChangeImage").src = ThemeColors.light_theme_indicator
  }

  for (var color in flavors[catppuccinTheme]["colors"]) {
    document.documentElement.style.setProperty("--" + color, flavors[catppuccinTheme]["colors"][color]["hex"])
  }

  document.getElementById("themeChangeButton").ariaLabel = "Change theme to " + isDark ? "dark theme" : "light theme"
}

function toggleTheme() {
  setCookie(!getCookie())

  setTheme();
}

function headerTheme() {
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return false;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  } else {
    return DEFAULT_THEME;
  }
}

function getCookie() {
  return Cookies.get("isDark") === "true"
}

function setCookie(value) {
  Cookies.set("isDark", value)
}

function testCookie() {
  if (!(Cookies.get("isDark") === "true" || Cookies.get("isDark") === "false")) {
    Cookies.set("isDark", headerTheme())
  }
}

export { setTheme, toggleTheme };