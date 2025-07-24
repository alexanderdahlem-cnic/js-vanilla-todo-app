// Data Structure

export interface Task {
    readonly id: number;
    task: string;
    done: boolean;
}

let data:Task[];

// Create

export const createEntry = (value: Task['task']) => {

    data.push({
        id: Date.now(),
        task: value,
        done: false
    })

    return saveStorage();
}

const getEntryIndex = (id: Task['id']):number => {
    return  data.findIndex((entry) => entry.id === Number(id));
}

export const readEntries = () => {
    return getTasksFromLocalStorage();
} 

// Read

const getTasksFromLocalStorage = ():Task[] => {
    data = JSON.parse(localStorage.getItem('tasks')) || [];
    return data;
}

// Update

export const updateEntry = (value:Task['task'], id:Task['id']) => {
    const objIndex = getEntryIndex(id);
    if (objIndex < 0) return;
    data[objIndex].task = value;
    return saveStorage();
}

export const toggleStatus = (id:Task['id']) => {
    const objIndex = getEntryIndex(id);
    if (objIndex < 0) return;
    data[objIndex].done = data[objIndex].done ? false : true;
    return saveStorage();
}

// Delete
export const deleteEntry = (id:Task['id']) => {
    const objIndex = getEntryIndex(id);
    if (objIndex < 0) return;
    data.splice(objIndex, 1);
    return saveStorage();
}

const saveStorage = ():Task[] => {
    try {
        localStorage.setItem('tasks', JSON.stringify(data));
    } catch (e) {
        alert ("Sorry, data storage failed: " + e.message);
    }
    return getTasksFromLocalStorage();
}