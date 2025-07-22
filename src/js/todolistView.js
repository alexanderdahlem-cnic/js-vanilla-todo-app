import { createIcons, X, Plus, CupSoda } from 'lucide';

const ulOpen = document.querySelector('#opentasks ul');
const ulClosed = document.querySelector('#closedtasks ul');
const noOpenInfo = document.querySelector('#noopentasks');

export const renderEntries = (entries) => {

    ulOpen.innerHTML = '';
    ulClosed.innerHTML = '';
    
    if (entries && entries.length > 0) {

        const opentasks = entries.filter(task => !task.done);
        const closedtasks = entries.filter(task => task.done);

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

    createIcons({icons: {X, Plus, CupSoda}});

}

// Render a single entry into its list

const renderEntry = (target, entry) => {
    const liHtml = `
            <li>
                <div>
                    <input type="checkbox" data-id="${entry.id}" ${entry.done ? 'checked' : ''}>
                </div>
                <div class="grow">
                    <textarea rows="1" data-id="${entry.id}">${entry.task}</textarea>
                </div>
                <div>
                    <a href="#" data-id="${entry.id}" class="delete"><i data-lucide="x"></i></a>
                </div>
            </li>`;

    target.insertAdjacentHTML('beforeend', liHtml);
}
