import "../css/style.scss";
import './components/taskEntry';
import './components/taskInput';
import todolistController from "./todolistController";


window.addEventListener("DOMContentLoaded", () => {
    todolistController();
});