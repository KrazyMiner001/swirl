import { flavors } from "https://esm.sh/@catppuccin/palette";
import Cookies from "https://esm.sh/js-cookie"

const ThemeColors = {
  dark_theme_indicator: "/assets/dark_theme.svg",
  light_theme_indicator: "/assets/light_theme.svg",
}


const DEFAULT_THEME = false;
const themeChangeImage = document.getElementById("themeChangeImage");
const themeChangeButton = document.getElementById("themeChangeButton");

function setTheme() {
  testCookie();
  let isDark = getCookie();

  let catppuccinTheme = isDark ? "frappe" : "latte";

  for (var color in flavors[catppuccinTheme]["colors"]) {
    document.documentElement.style.setProperty("--" + color, flavors[catppuccinTheme]["colors"][color]["hex"])
  }

  if (themeChangeImage == null) return;

  if (isDark) {
    themeChangeImage.src = ThemeColors.dark_theme_indicator
  } else {
    themeChangeImage.src = ThemeColors.light_theme_indicator
  }

  if (themeChangeButton == null) return;

  themeChangeButton.ariaLabel = "Change theme to " + isDark ? "dark theme" : "light theme"
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