class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.inputHandler = new (window.InputHandler || class {})();
        this.renderer = new (window.Renderer || class {})(this.canvas, this.ctx);
        this.physicsEngine = new (window.PhysicsEngine || class {})();
        this.stateManager = new (window.StateManager || class {})();
        this.audioManager = new (window.AudioManager || class {})();
        this.levelManager = new (window.LevelManager || class {})();
        this.scoreManager = new (window.ScoreManager || class {})();
        this.entityManager = new (window.EntityManager || class {})(this);
        this.collisionSystem = new (window.CollisionSystem || class {})(this);
        this.uiManager = new (window.UIManager || class {})(this);
        this.lastTime = 0;
        this.fps = 60;
        this.frameId = null;
        this.pauseKeyDown = false;
        this.init();
    }
    init() {
        this.bindUIKeys();
        this.audioManager.playBackgroundMusic();
        this.uiManager.update();
        this.render();
    }
    startGame() {
        this.levelManager.reset();
        this.scoreManager.reset();
        this.loadLevel();
        this.stateManager.setState('playing');
        this.uiManager.update();
        this.lastTime = performance.now();
    }
    loadLevel() {
        const config = this.levelManager.getLevelConfig();
        this.entityManager.reset();
        this.entityManager.spawnVillages(config.villages);
        this.entityManager.spawnEnemies(config.enemies);
        this.entityManager.spawnEnvironment(config.environment);
    }
    render(now) {
        this.frameId = requestAnimationFrame(ts => this.render(ts));
        if (!this.lastTime) this.lastTime = now || performance.now();
        let dt = ((now || performance.now()) - this.lastTime) / 1000;
        dt = Math.max(0.01, Math.min(dt, 0.09));
        this.lastTime = now || performance.now();

        // State
        if (this.stateManager.isPlaying()) {
            this.gameUpdate(dt);
        }
        this.renderer.render(this);
        this.uiManager.update();
        // Update HUD if present
        this.uiManager.updateHUD(this.entityManager.dragon, this.scoreManager.score);
    }
    gameUpdate(dt) {
        this.physicsEngine.update(this, dt);
        this.collisionSystem.update();

        // Check if all villages destroyed
        const allDestroyed = this.entityManager.villages.every(v => v.destroyed);
        if (allDestroyed) {
            if (this.levelManager.isLastLevel()) {
                this.stateManager.setState('victory');
                this.uiManager.update();
            } else {
                this.levelManager.nextLevel();
                this.loadLevel();
            }
        }
        // Random powerup spawn
        if (Math.random() < 0.002) {
            if (this.entityManager.powerups.length < 2) {
                // Random powerup
                let px = 80+Math.random()*800, py = 90+Math.random()*440;
                let type = Math.random() < 0.54 ? 'heal' : 'power';
                this.entityManager.spawnPowerUp(px, py, type);
            }
        }
        // Score for destroyed villages
        for (const v of this.entityManager.villages) {
            if (v.destroyed && !v._scored) {
                this.scoreManager.add(100);
                v._scored = true;
            }
        }
        // Pause key
        if ((this.inputHandler.isKeyDown('escape') || this.inputHandler.isKeyDown('p'))) {
            if (!this.pauseKeyDown) {
                this.pauseKeyDown = true;
                if (this.stateManager.isPlaying()) {
                    this.stateManager.setState('paused');
                    this.uiManager.update();
                }
            }
        } else {
            this.pauseKeyDown = false;
        }
        // Game Over condition handled in collisionSystem
    }
    endGame(victory = false) {
        if (victory) {
            this.stateManager.setState('victory');
        } else {
            this.stateManager.setState('gameover');
        }
        this.uiManager.update();
    }
    resumeGame() {
        this.stateManager.setState('playing');
        this.uiManager.update();
    }
    quitToMenu() {
        this.stateManager.setState('main_menu');
        this.uiManager.update();
    }
    bindUIKeys() {
        window.addEventListener('keydown', e => {
            if (this.stateManager.isMenu() && (e.key === ' ' || e.key === 'Enter')) {
                this.startGame();
            }
            if (this.stateManager.isVictory() && (e.key === ' ' || e.key === 'Enter')) {
                this.startGame();
            }
            if (this.stateManager.isGameOver() && (e.key === ' ' || e.key === 'Enter')) {
                this.startGame();
            }
            if ((this.stateManager.isPaused() && (e.key === ' ' || e.key === 'Enter'))) {
                this.resumeGame();
            }
        });
    }
}

window.Game = Game;

window.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});