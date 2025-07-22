import "../css/style.scss";
import todolistController from "./todolistController.js";
import './components/taskEntry.js';
import './components/taskInput.js';

window.addEventListener("DOMContentLoaded", () => {
    todolistController();
});