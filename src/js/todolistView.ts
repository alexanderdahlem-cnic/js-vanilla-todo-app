import { createIcons, X, Plus, CupSoda } from 'lucide';
import {Task} from './todolistModel';

export const renderEntries = (entries:Task[]): void => {

    const ulOpen:HTMLElement = document.querySelector('ul#opentaskslist');
    const ulClosed:HTMLElement = document.querySelector('#closedtaskslist');
    const noOpenInfo:HTMLElement = document.querySelector('#noopentasks');

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

const renderEntry = (target:HTMLElement, entry:Task):void => {
    const liHtml = document.createElement('li');
    liHtml.innerHTML = `
            <task-entry>
                <div>
                    <input type="checkbox" data-id="${entry.id}" ${entry.done ? 'checked' : ''}>
                </div>
                <task-input class="grow">
                    <div data-id="${entry.id}" class="taskinputfield" contenteditable></div>
                </task-input>
                <div>
                    <a href="#" data-id="${entry.id}" class="delete"><i data-lucide="x"></i></a>
                </div>
            </task-entry>
            `;

    liHtml.querySelector('.taskinputfield').innerHTML = entry.task;
    target.prepend(liHtml);
}
