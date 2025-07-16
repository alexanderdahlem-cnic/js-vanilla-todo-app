import "../css/style.scss";
import enableAutoResize from "./autoResizeTextarea";
import todolistCrud from "./todolistCrud.js";

window.addEventListener("DOMContentLoaded", () => {
    todolistCrud();
    enableAutoResize();
    lucide.createIcons();
});