import {setTheme, toggleTheme} from "./modules/theme.js";

setTheme();
const button = document.getElementById("themeChangeButton");
if (button != null) button.onclick = toggleTheme