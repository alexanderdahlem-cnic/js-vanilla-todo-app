import * as model from './todolistModel';
import * as view from './todolistView';


export default function todolistController () {

    const init = () => {
        addListeners();
        const entries = model.readEntries();
        if (entries) view.renderEntries(entries);

    }

    const addListeners = () => {

        // Listen to events dispatched by components

        document.addEventListener('toggleTaskStatus', (event) => {
            view.renderEntries(model.toggleStatus(event.detail.id));
        });

        document.addEventListener('deleteTask', (event) => {
            view.renderEntries(model.deleteEntry(event.detail.id));
        });

        document.addEventListener('createTask', (event) => {
            view.renderEntries(model.createEntry(event.detail.task));
        });

        document.addEventListener('updateTask', (event) => {
            view.renderEntries(model.updateEntry(event.detail.task, event.detail.id));
        });
    } 

    init();

}