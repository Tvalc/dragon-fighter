class UIManager {
    constructor(game) {
        this.game = game;
        this.overlay = document.getElementById('ui-overlay');
        this.currentScreen = null;
        this.lastState = null;
        this.hud = null;
    }
    update() {
        if (!this.overlay) return;
        const state = this.game.stateManager.getState();
        if (state !== this.lastState) {
            this.overlay.innerHTML = '';
            if (state === 'main_menu') {
                this.showMainMenu();
            } else if (state === 'paused') {
                this.showPauseMenu();
            } else if (state === 'victory') {
                this.showVictoryScreen();
            } else if (state === 'gameover') {
                this.showGameOverScreen();
            }
            this.lastState = state;
        }
        if (state === 'playing') {
            this.showHUD();
        } else {
            this.hideHUD();
        }
    }
    showMainMenu() {
        const div = document.createElement('div');
        div.className = 'menu-screen';
        div.innerHTML = `<h1>Dragon Destruction</h1>
        <p>Burn villages, avoid arrows, and become legend!</p>
        <button class="menu-button" id="start-btn">Start Game</button>`;
        this.overlay.appendChild(div);
        setTimeout(() => {
            const btn = document.getElementById('start-btn');
            if (btn) btn.onclick = () => {
                if (this.game.audioManager) this.game.audioManager.playUIClick();
                this.game.startGame();
            };
        }, 0);
    }
    showPauseMenu() {
        const div = document.createElement('div');
        div.className = 'pause-screen';
        div.innerHTML = `<h1>Paused</h1>
        <button class="resume-button" id="resume-btn">Resume</button>
        <button class="menu-button" id="quit-btn">Quit</button>`;
        this.overlay.appendChild(div);
        setTimeout(() => {
            document.getElementById('resume-btn').onclick = () => {
                if (this.game.audioManager) this.game.audioManager.playUIClick();
                this.game.resumeGame();
            };
            document.getElementById('quit-btn').onclick = () => {
                if (this.game.audioManager) this.game.audioManager.playUIClick();
                this.game.quitToMenu();
            };
        }, 0);
    }
    showVictoryScreen() {
        const div = document.createElement('div');
        div.className = 'victory-screen';
        div.innerHTML = `<h1>Victory!</h1>
        <p>You destroyed all villages.</p>
        <p>Score: ${this.game.scoreManager ? this.game.scoreManager.score : 0}</p>
        <button class="restart-button" id="restart-btn">Restart</button>`;
        this.overlay.appendChild(div);
        setTimeout(() => {
            document.getElementById('restart-btn').onclick = () => {
                if (this.game.audioManager) this.game.audioManager.playUIClick();
                this.game.startGame();
            };
        }, 0);
    }
    showGameOverScreen() {
        const div = document.createElement('div');
        div.className = 'gameover-screen';
        div.innerHTML = `<h1>Defeat</h1>
        <p>Your dragon has fallen.</p>
        <p>Score: ${this.game.scoreManager ? this.game.scoreManager.score : 0}</p>
        <button class="restart-button" id="restart-btn">Restart</button>`;
        this.overlay.appendChild(div);
        setTimeout(() => {
            document.getElementById('restart-btn').onclick = () => {
                if (this.game.audioManager) this.game.audioManager.playUIClick();
                this.game.startGame();
            };
        }, 0);
    }
    showHUD() {
        if (this.hud) return;
        const div = document.createElement('div');
        div.className = 'hud-bar';
        div.innerHTML = `
            <div class="hud-section" id="hud-health-section">
                <span>Health:</span>
                <span class="hud-health"><span class="hud-health-inner" style="width:100%"></span></span>
            </div>
            <div class="hud-section" id="hud-score-section">
                <span>Score: <span id="hud-score">0</span></span>
            </div>
            <div class="hud-section">
                <span style="font-size:1em;">[WASD/Arrows]: Move</span>
                <span style="font-size:1em;">[Space/Tap]: Fire Breath</span>
                <span style="font-size:1em;">[Esc/P]: Pause</span>
            </div>
        `;
        this.overlay.appendChild(div);
        this.hud = div;
    }
    hideHUD() {
        if (this.hud) {
            if (this.hud.parentElement) this.hud.parentElement.removeChild(this.hud);
            this.hud = null;
        }
    }
    updateHUD(dragon, score) {
        if (!this.hud) return;
        const healthBar = this.hud.querySelector('.hud-health-inner');
        if (healthBar && dragon) {
            const percent = Math.max(0, dragon.health / dragon.maxHealth);
            healthBar.style.width = `${percent * 100}%`;
        }
        const scoreElem = this.hud.querySelector('#hud-score');
        if (scoreElem) scoreElem.textContent = score;
    }
}

window.UIManager = UIManager;