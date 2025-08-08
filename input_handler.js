class InputHandler {
    constructor() {
        this.keys = {};
        this.mouseDown = false;
        this.mousePos = { x: 0, y: 0 };
        this.lastDir = 'right';
        this.setupEvents();
    }
    setupEvents() {
        window.addEventListener('keydown', e => {
            if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) {
                e.preventDefault();
            }
            this.keys[e.key.toLowerCase()] = true;
        });
        window.addEventListener('keyup', e => {
            this.keys[e.key.toLowerCase()] = false;
        });
        const canvas = document.getElementById('game-canvas');
        canvas.addEventListener('mousedown', e => {
            this.mouseDown = true;
            this.mousePos = this.getMouse(e, canvas);
        });
        canvas.addEventListener('mouseup', e => {
            this.mouseDown = false;
        });
        canvas.addEventListener('mousemove', e => {
            this.mousePos = this.getMouse(e, canvas);
        });
        // Touch controls
        canvas.addEventListener('touchstart', e => {
            this.mouseDown = true;
            this.mousePos = this.getTouch(e, canvas);
        });
        canvas.addEventListener('touchend', e => {
            this.mouseDown = false;
        });
        canvas.addEventListener('touchmove', e => {
            this.mousePos = this.getTouch(e, canvas);
        });
    }
    getMouse(e, canvas) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * (canvas.width / rect.width),
            y: (e.clientY - rect.top) * (canvas.height / rect.height)
        };
    }
    getTouch(e, canvas) {
        if (!e.touches[0]) return {x:0,y:0};
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.touches[0].clientX - rect.left) * (canvas.width / rect.width),
            y: (e.touches[0].clientY - rect.top) * (canvas.height / rect.height)
        };
    }
    isKeyDown(key) {
        return !!this.keys[key.toLowerCase()];
    }
}

window.InputHandler = InputHandler;