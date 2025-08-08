class StateManager {
    constructor() {
        this.state = 'main_menu'; // main_menu, playing, paused, victory, gameover
    }
    setState(state) {
        this.state = state;
    }
    getState() {
        return this.state;
    }
    isPlaying() { return this.state === 'playing'; }
    isPaused() { return this.state === 'paused'; }
    isMenu() { return this.state === 'main_menu'; }
    isVictory() { return this.state === 'victory'; }
    isGameOver() { return this.state === 'gameover'; }
}
window.StateManager = StateManager;