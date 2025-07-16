export default function enableAutoResize () {
    
    const resize = (el) => {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }

    const setupTextareas = (el) => {

        document.addEventListener('input', event => {
            if (event.target.matches("textarea")) {
                resize(event.target);
            }
        });
    }

    // Setup existing textarea
    setupTextareas();

}