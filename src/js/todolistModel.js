let data = [];

export const writeData = (el) => {

    // Bridgefunction if create, update or delete

    // Textarea was sent off

    const id = el.dataset.id;
    const value = el.value;
    const isEmpty = value.replace(/\s+/g, '') === '';

    if (id) {
        if (!isEmpty) { // if theres a value, update the entry
            return updateEntry(el.value, id);    
        } else {  // If empty, delete the entry
           return deleteEntry(id);
        }
    } else {
        if (isEmpty) return getTaskFromLocalStorage(); // Ask Noel for a nice solution here
        el.value = '';
        return createEntry(value);
    }
}

// Create

const createEntry = (value) => {

    console.log(data);

    data.push({
        id: Date.now(),
        task: value,
        done: false
    })

    return saveStorage();
}

const getEntryIndex = (id) => {
    return  data.findIndex((entry) => entry.id === Number(id));
}

export const getTasks = () => {
    return getTaskFromLocalStorage();
} 

// Read

const getTaskFromLocalStorage = () => {
    data = JSON.parse(localStorage.getItem('tasks')) || [];
    return data;
}

// Update

const updateEntry = (value, id
) => {
    const objIndex = getEntryIndex(id);
    if (objIndex < 0) return;
    data[objIndex].task = value;
    return saveStorage();
}

export const toggleStatus = (id) => {
    const objIndex = getEntryIndex(id);
    if (objIndex < 0) return;
    data[objIndex].done = data[objIndex].done ? false : true;
    return saveStorage();
}

// Delete
export const deleteEntry = (id) => {
    const objIndex = getEntryIndex(id);
    if (objIndex < 0) return;
    data.splice(objIndex, 1);
    return saveStorage();
}

const saveStorage = () => {
    try {
        localStorage.setItem('tasks', JSON.stringify(data));
    } catch (e) {
        alert ("Sorry, data storage failed: " + e.message);
    }
    const storedTasks = getTaskFromLocalStorage();
    return storedTasks;
}