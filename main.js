import { setTheme, toggleTheme } from "./modules/theme.js";

setTheme();
document.getElementById("themeChangeButton").onclick = toggleTheme;