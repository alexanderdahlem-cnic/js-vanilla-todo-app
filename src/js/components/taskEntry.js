class TaskEntry extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback()  {
        this.resolveElements();
        this.addListeners();
    } 

    resolveElements = function () {
        this.checkbox = this.querySelector('input[type="checkbox"]');
        this.delete = this.querySelector('a.delete');
    }

    addListeners = function () {

        // Event toggle status
        this.checkbox.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            this.dispatchEvent(new CustomEvent('toggleTaskStatus', {
                bubbles: true,
                detail: {
                    id: id
                }
            }))
        });

        // Event delete task
        this.delete.addEventListener('click', (e) => {
            e.preventDefault();
            const link = e.target.closest("a");

            if (link) {
                // Delete an entry
                const id = link.dataset.id;
                this.dispatchEvent(new CustomEvent('deleteTask', {
                    bubbles: true,
                    detail: {
                        id: id
                    }
                })
            )}
        });
    }
}

customElements.define('task-entry', TaskEntry);