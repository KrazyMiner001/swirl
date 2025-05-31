import { flavors } from "https://esm.sh/@catppuccin/palette";
import Cookies from "https://esm.sh/js-cookie"

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
  if (Cookies.get('theme') === undefined) {
    Cookies.set('theme', headerTheme());
  }

  let theme = Cookies.get("theme");
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
  let old_theme = Cookies.get("theme");
  if (old_theme === "dark") {
    Cookies.set("theme", "light");
  } else if (old_theme === "light") {
    Cookies.set("theme", "dark");
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

export { setTheme, toggleTheme };