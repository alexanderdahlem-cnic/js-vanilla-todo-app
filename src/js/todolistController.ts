import * as model from './todolistModel';
import * as view from './todolistView';


export default function todolistController ():void {

    const init = ():void => {
        addListeners();
        const entries = model.readEntries();
        if (entries) view.renderEntries(entries);

    }

    const addListeners = () => {

        // Listen to events dispatched by components

        document.addEventListener('toggleTaskStatus', (event: CustomEvent):void => {
            view.renderEntries(model.toggleStatus(event.detail.id));
        });

        document.addEventListener('deleteTask', (event: CustomEvent):void => {
            view.renderEntries(model.deleteEntry(event.detail.id));
        });

        document.addEventListener('createTask', (event: CustomEvent):void => {
            view.renderEntries(model.createEntry(event.detail.task));
        });

        document.addEventListener('updateTask', (event: CustomEvent):void => {
            view.renderEntries(model.updateEntry(event.detail.task, event.detail.id));
        });

        // Synchronize between tabs
        window.addEventListener('storage', ():void => {
            view.renderEntries(model.readEntries());
        })
    } 

    init();

}