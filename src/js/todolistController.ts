import * as model from './todolistModel';
import * as view from './todolistView';


export default function todolistController ():void {

    const init = ():void => {
        addListeners();
        const entries = model.readEntries();
        if (entries) view.renderEntries(entries);

    }

    const addListeners = ():void => {

        // Listen to events dispatched by components

        document.addEventListener('toggleTaskStatus', (event: CustomEvent) => {
            view.renderEntries(model.toggleStatus(event.detail.id));
        });

        document.addEventListener('deleteTask', (event: CustomEvent) => {
            view.renderEntries(model.deleteEntry(event.detail.id));
        });

        document.addEventListener('createTask', (event: CustomEvent) => {
            view.renderEntries(model.createEntry(event.detail.task));
        });

        document.addEventListener('updateTask', (event: CustomEvent) => {
            view.renderEntries(model.updateEntry(event.detail.task, event.detail.id));
        });

        // Synchronize between tabs
        window.addEventListener('storage', () => {
            view.renderEntries(model.readEntries());
        })
    } 

    init();

}