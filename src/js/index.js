import "../css/style.scss";
import enableAutoResize from "./autoResizeTextarea";
import todolistCrud from "./todolistController.js";

window.addEventListener("DOMContentLoaded", () => {
    todolistCrud();
    enableAutoResize();
});