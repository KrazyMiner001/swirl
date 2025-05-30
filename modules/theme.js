import { flavors } from "https://esm.sh/@catppuccin/palette";

const Theme = {
  DARK: "dark",
  LIGHT: "light"
}

const ThemeColors = {
  dark_theme_indicator: "url(\"./dark_theme.svg\")",
  light_theme_indicator: "url(\"./light_theme.svg\")",
}

const DEFAULT_THEME = Theme.LIGHT;

function setTheme() {
  if (getCookie("theme") === "") {
    setCookie("theme", headerTheme(), 90);
  }

  let theme = getCookie("theme");
  let catppuccinTheme = toCatppuccinTheme(theme);

  document.documentElement.style.setProperty("--theme", theme);

  for (var type in ThemeColors) {
    if (type.startsWith(theme)) {
      document.documentElement.style.setProperty("--" + type.replaceAll("dark_", "").replaceAll("light_", ""), ThemeColors[type]);
    }
  }

  for (var color in flavors[catppuccinTheme]["colors"]) {
    document.documentElement.style.setProperty("--" + color, flavors[catppuccinTheme]["colors"][color]["hex"])
  }
}

function toCatppuccinTheme(theme) {
  if (theme === "dark") {
    return "mocha";
  } else if (theme === "light") {
    return "latte";
  } else {
    return null;
  }
}

function toggleTheme() {
  let old_theme = getCookie("theme");
  if (old_theme === "dark") {
    setCookie("theme", "light");
  } else if (old_theme === "light") {
    setCookie("theme", "dark");
  }

  setTheme();
}

function headerTheme() {
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return Theme.LIGHT;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return Theme.DARK;
  } else {
    return DEFAULT_THEME;
  }
}

function setCookie(name, value, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  name = name + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export { setTheme, toggleTheme };