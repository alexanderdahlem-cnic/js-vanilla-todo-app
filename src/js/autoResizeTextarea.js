export default function enableAutoResize () {
    
    const resize = (el) => {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }

    const observeInput = (input) => {
        // observe user inputs
        input.addEventListener('input', () => {handleChange(input)});
        input.addEventListener('change', () => {handleChange(input)});

        // overwrite the value setter to handle external JS changes to the field
        const original = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value');
        Object.defineProperty(input, 'value', {
            set (val) {
                original.set.call(this, val);
                handleChange(this);
            },
            get () {
                return original.get.call(this);
            }
        });

        resize(input); // Resize on observation start
    }

    const handleChange = (target) => {

        if (target.matches("textarea")) {
            resize(target);
        }
    }
    
    // Observe textareas rendered on init
    document.querySelectorAll('textarea').forEach(observeInput);

    // Listen to DOM for new textareas
    const domObserver = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType != 1) return; // Not an element

                if (node.tagName === 'TEXTAREA') { // Our node is a textarea, observe it
                    observeInput (node);
                }

                // Or does it contain textarea?
                node.querySelectorAll?.('textarea')?.forEach(observeInput);
            });
        }
    });

    domObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

}