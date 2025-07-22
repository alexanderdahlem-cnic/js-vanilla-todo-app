import "../css/style.scss";
import enableAutoResize from "./autoResizeTextarea";
import todolistController from "./todolistController.js";

window.addEventListener("DOMContentLoaded", () => {
    todolistController();
    enableAutoResize();
});