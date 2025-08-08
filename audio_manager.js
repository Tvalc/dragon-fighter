class AudioManager {
    constructor() {
        this.muted = false;
    }
    playDragonRoar() {
        if (!this.muted && window.Assets && window.Assets.sounds) window.Assets.sounds.dragonRoar();
    }
    playBuildingCollapse() {
        if (!this.muted && window.Assets && window.Assets.sounds) window.Assets.sounds.buildingCollapse();
    }
    playUIClick() {
        if (!this.muted && window.Assets && window.Assets.sounds) window.Assets.sounds.uiClick();
    }
    playBackgroundMusic() {
        if (!this.muted && window.Assets && window.Assets.sounds) window.Assets.sounds.backgroundMusic();
    }
    toggleMute() {
        this.muted = !this.muted;
    }
}
window.AudioManager = AudioManager;