export default function todolistCrud () {

    let data = []; // The data array of tasks
    let opentasks = []; // List of open tasks
    let closedtasks = []; // List of finished tasks

    const init = () => {
        prepareElements();
        readEntries();
    }

    const prepareElements = () => {

        // Adding events to document since we alter the DOM

        document.addEventListener('click', event => {

            const link = event.target.closest("a");

            if (link) {
                // Delete an entry
                if (link.matches('.delete')) {
                    deleteEntry(link.dataset.id); 
                }
            }
            
            // Toggle status of done
            else if (event.target.matches("input[type=checkbox]")) {
                toggleStatus(event.target.dataset.id);
            }

        });

        document.addEventListener('keydown', event => {
            if (event.target.matches("textarea")) {
                if (event.key === "Enter") {
                    
                    event.preventDefault();
                    
                    if (event.ctrlKey || event.metaKey) {
                        // Holding control will create a break

                        const start = event.target.selectionStart;
                        const end = event.target.selectionEnd;
                        const value = event.target.value;

                        event.target.value = value.substring(0, start) + "\n" + value.substring(end);

                    } else {

                        writeData(event.target);
                    
                    }
                }
            }
        });
    } 

    const writeData = (el) => {

        // Textarea was sent off

        const id = el.dataset.id;
        const value = el.value;
        if (id) {
            if (value.length > 0) { // if theres a value, update the entry
                updateEntry(el.value, id);    
            } else {  // If empty, delete the entry
                deleteEntry(id);
            }
        } else {
            createEntry(el.value);
            el.value = '';
        }
    }

    // Render the lists of entries

    const renderEntries = () => {

        document.querySelector('#opentasks ul').innerHTML = '';
        document.querySelector('#closedtasks ul').innerHTML = '';
        
        if (data && data.length > 0) {

            opentasks = data.filter(task => !task.done);
            closedtasks = data.filter(task => task.done);

            if (opentasks.length > 0) {
                document.querySelector('#noopentasks').classList.add('hidden');
                opentasks.forEach(task => renderEntry(document.querySelector('#opentasks ul'), task));
            } else {
                document.querySelector('#noopentasks').classList.remove('hidden');
            }

            if (closedtasks.length > 0) {
                closedtasks.forEach(task => renderEntry(document.querySelector('#closedtasks ul'), task));
            }

        } else {
            document.querySelector('#noopentasks').classList.remove('hidden');
        }

        lucide.createIcons();
    }

    // Render a single entry into its list

    const renderEntry = (target, task) => {
        const liHtml = `
                <li>
                    <div>
                        <input type="checkbox" data-id="${task.id}" ${task.done ? 'checked' : ''}>
                    </div>
                    <div class="grow">
                        <textarea rows="1" data-id="${task.id}">${task.task}</textarea>
                    </div>
                    <div>
                        <a href="#" data-id="${task.id}" class="delete"><i data-lucide="x"></i></a>
                    </div>
                </li>`;

        target.innerHTML += liHtml;
    }

    // Create

    const createEntry = (value) => {

        console.log(data);

        data.push({
            id: Date.now(),
            task: value,
            done: false
        })

        saveStorage();
    }

    // Read

    const readEntries = () => {
        data = JSON.parse(localStorage.getItem('tasks')) || [];
        renderEntries();
    }

    // Update

    const updateEntry = (value, id) => {
        id = Number(id);
        const objIndex = data.findIndex((entry) => entry.id === id);
        data[objIndex].task = value;
        saveStorage();
    }

    const toggleStatus = (id) => {
        id = Number(id);
        const objIndex = data.findIndex((entry) => entry.id === id);
        data[objIndex].done = data[objIndex].done ? false : true;
        saveStorage();
    }

    // Delete
    const deleteEntry = (id) => {
        id = Number(id);
        console.log ("Delete ", id);
        const objIndex = data.findIndex((entry) => entry.id === id);
        data.splice(objIndex, 1);
        saveStorage();
    }

    const saveStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(data));
        readEntries();
    }

    init();

}