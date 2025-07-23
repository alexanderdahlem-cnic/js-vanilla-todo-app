class TaskInput extends HTMLElement {
    private inputfield!: HTMLElement;
    
    constructor() {
      super();
    }

    connectedCallback()  {
        this.resolveElements();
        this.addListeners();
    } 

    private resolveElements () {
        this.inputfield = this.querySelector('.taskinputfield');
    }

    private addListeners () {
        this.inputfield.addEventListener('keydown', (e) => {
            const target = (e.target as HTMLElement);
            if (e.key === "Enter") {
                
                if (e.shiftKey) return;  // Just a break, hold your horses

                e.preventDefault();

                const isEmpty = target.textContent.replace(/\s+/g, '') === '';
                const id = target.dataset.id;

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
            const target = (e.target as HTMLElement);
            setTimeout(() => { // we sanitize right after paste
                const data = this.sanitize(target.innerHTML)
                target.innerHTML = data;
            }, 10)
        });
        
    }

    private sanitize (data) {
        return data.replace(/<(?!br\s*\/?)[^>]+>/gi, '');
    }
}

if (!customElements.get('task-input')) {
    customElements.define('task-input', TaskInput);
}