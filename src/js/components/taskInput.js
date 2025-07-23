class TaskInput extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback()  {
        this.resolveElements();
        this.addListeners();
    } 

    resolveElements = function () {
        this.inputfield = this.querySelector('.taskinputfield');
    }

    addListeners = function () {
        this.inputfield.addEventListener('keydown', (e) => {
            const target = e.target;
            if (e.key === "Enter") {
                
                if (e.shiftKey) return;  // Just a break, hold your horses

                e.preventDefault();

                const isEmpty = target.textContent.replace(/\s+/g, '') === '';
                const id = e.target.dataset.id;

                if (id) { // Existing entry needs an update
                    if (isEmpty) { // if task description is empty, delete whole task
                        this.dispatchEvent(new CustomEvent('deleteTask', {
                            bubbles: true,
                            detail: {
                                id: id
                            }
                        }));
                    } else {
                        this.dispatchEvent(new CustomEvent('updateTask', {
                            bubbles: true,
                            detail: {
                                task: this.sanitize(target.innerHTML),
                                id: id
                            }
                        }));
                    }
                    return;
                }

                // No ID? Let's take care of a new task
                if (isEmpty) return; // Empty, return

                this.dispatchEvent(new CustomEvent('createTask', {
                    bubbles: true,
                    detail: {
                        task: this.sanitize(target.innerHTML)
                    }
                }));

                target.innerHTML = '';
            }
        });

        this.inputfield.addEventListener('paste', (e) => {
            setTimeout(() => { // we sanitize right after paste
                const data = this.sanitize(e.target.innerHTML)
                e.target.innerHTML = data;
            }, 10)
        });
        
    }

    sanitize = function (data) {
        return data.replace(/<(?!br\s*\/?)[^>]+>/gi, '');
    }
}

customElements.define('task-input', TaskInput);