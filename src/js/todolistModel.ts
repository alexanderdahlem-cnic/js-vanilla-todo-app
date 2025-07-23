let data = [];

// Create

export const createEntry = (value) => {

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

export const readEntries = () => {
    return getTasksFromLocalStorage();
} 

// Read

const getTasksFromLocalStorage = () => {
    data = JSON.parse(localStorage.getItem('tasks')) || [];
    return data;
}

// Update

export const updateEntry = (value, id) => {
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
    const storedTasks = getTasksFromLocalStorage();
    return storedTasks;
}