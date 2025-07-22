import * as model from './todolistModel.js';
import * as view from './todolistView.js';


export default function todolistCrud () {

    const init = () => {
        prepareElements();
        const entries = model.getTasks();
        if (entries) view.renderEntries(entries);

    }

    const prepareElements = () => {

        // Adding events to document since we alter the DOM

        document.addEventListener('click', event => {

            const link = event.target.closest("a");

            if (link) {
                // Delete an entry
                if (link.matches('.delete')) {
                    view.renderEntries(model.deleteEntry(link.dataset.id)); 
                }
            }
            
            // Toggle status of done
            else if (event.target.matches("input[type=checkbox]")) {
                view.renderEntries(model.toggleStatus(event.target.dataset.id));
            }

        });

        document.addEventListener('keydown', event => {
            const target = event.target;
            if (target.matches("textarea")) {
                if (event.key === "Enter") {
                    
                    event.preventDefault();
                    
                    if (event.ctrlKey || event.metaKey) {
                        // Holding control will create a break

                        const start = target.selectionStart;
                        const end = target.selectionEnd;
                        const value = target.value;

                        target.value = value.substring(0, start) + "\n" + value.substring(end);

                    } else {

                        view.renderEntries(model.writeData(target));
                    
                    }
                }
            }
        });
    } 

    init();

}