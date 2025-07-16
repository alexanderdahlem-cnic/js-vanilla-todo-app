export default function todolistCrud () {

    let data = []; // The data array of tasks
    let opentasks = []; // List of open tasks
    let closedtasks = []; // List of finished tasks

    const ulOpen = document.querySelector('#opentasks ul');
    const ulClosed = document.querySelector('#closedtasks ul');
    const noOpenInfo = document.querySelector('#noopentasks');

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

        ulOpen.innerHTML = '';
        ulClosed.innerHTML = '';
        
        if (data && data.length > 0) {

            opentasks = data.filter(task => !task.done);
            closedtasks = data.filter(task => task.done);

            if (opentasks.length > 0) {
                noOpenInfo.classList.add('hidden');
                opentasks.forEach(task => renderEntry(ulOpen, task));
            } else {
                noOpenInfo.classList.remove('hidden');
            }

            if (closedtasks.length > 0) {
                closedtasks.forEach(task => renderEntry(ulClosed, task));
            }

        } else {
            noOpenInfo.classList.remove('hidden');
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

        target.insertAdjacentHTML('beforeend', liHtml);
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

    const getEntryIndex = (id) => {
        return  data.findIndex((entry) => entry.id === Number(id));
    }

    // Read

    const readEntries = () => {
        data = JSON.parse(localStorage.getItem('tasks')) || [];
        renderEntries();
    }

    // Update

    const updateEntry = (value, id) => {
        const objIndex = getEntryIndex(id);
        if (objIndex < 0) return;
        data[objIndex].task = value;
        saveStorage();
    }

    const toggleStatus = (id) => {
        const objIndex = getEntryIndex(id);
        if (objIndex < 0) return;
        data[objIndex].done = data[objIndex].done ? false : true;
        saveStorage();
    }

    // Delete
    const deleteEntry = (id) => {
        const objIndex = getEntryIndex(id);
        if (objIndex < 0) return;
        data.splice(objIndex, 1);
        saveStorage();
    }

    const saveStorage = () => {
        try {
            localStorage.setItem('tasks', JSON.stringify(data));
        } catch (e) {
            alert ("Sorry, data storage failed: " + e.message);
        }
        readEntries();
    }

    init();

}