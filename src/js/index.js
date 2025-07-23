import "../css/style.scss";
import todolistController from "./todolistController";
import './components/taskEntry';
import './components/taskInput';

window.addEventListener("DOMContentLoaded", () => {
    todolistController();
});