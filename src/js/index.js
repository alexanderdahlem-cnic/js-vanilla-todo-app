import "../css/style.scss";
import enableAutoResize from "./autoResizeTextarea";
import todolistCrud from "./todolistController.js";
import { createIcons, X, Plus, CupSoda } from 'lucide';

window.addEventListener("DOMContentLoaded", () => {
    todolistCrud();
    enableAutoResize();
    createIcons({icons: {X, Plus, CupSoda}});
});