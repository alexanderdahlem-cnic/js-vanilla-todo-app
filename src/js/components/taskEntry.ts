class TaskEntry extends HTMLElement {

    private checkbox!: HTMLInputElement;
    private delete!: HTMLAnchorElement;

    constructor() {
      super();
    }

    connectedCallback()  {
        this.resolveElements();
        this.addListeners();
    } 

    private resolveElements ():void {
        this.checkbox = this.querySelector('input[type="checkbox"]');
        this.delete = this.querySelector('a.delete');
    }

    private addListeners ():void {

        // Event toggle status
        this.checkbox.addEventListener('click', (e) => {
            const id = (e.target as HTMLElement).dataset.id;
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
            const link = (e.target as HTMLElement).closest("a");

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