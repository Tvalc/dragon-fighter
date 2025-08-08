// All assets are data URIs or encoded in code. No external files.

// Dragon sprite (simple red/orange polygonal dragon, top-down, 48x48)
const dragonSprite = (() => {
    const size = 48;
    const cvs = document.createElement('canvas');
    cvs.width = cvs.height = size;
    const ctx = cvs.getContext('2d');
    // Body
    ctx.save();
    ctx.translate(24, 28);
    ctx.rotate(-0.1);
    ctx.beginPath();
    ctx.moveTo(-18, 0);
    ctx.lineTo(-8, -20);
    ctx.lineTo(8, -20);
    ctx.lineTo(18, 0);
    ctx.lineTo(8, 10);
    ctx.lineTo(-8, 10);
    ctx.closePath();
    ctx.fillStyle = '#b72e2e';
    ctx.shadowColor = '#701818';
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
    // Wings
    ctx.save();
    ctx.translate(24, 22);
    ctx.beginPath();
    ctx.moveTo(-16, -6);
    ctx.bezierCurveTo(-40, -22, -12, 8, -12, 2);
    ctx.bezierCurveTo(-12, 4, -16, 14, -2, 6);
    ctx.closePath();
    ctx.fillStyle = '#e8613c';
    ctx.globalAlpha = 0.8;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
    ctx.save();
    ctx.translate(24, 22);
    ctx.beginPath();
    ctx.moveTo(16, -6);
    ctx.bezierCurveTo(40, -22, 12, 8, 12, 2);
    ctx.bezierCurveTo(12, 4, 16, 14, 2, 6);
    ctx.closePath();
    ctx.fillStyle = '#e8613c';
    ctx.globalAlpha = 0.8;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
    // Head
    ctx.save();
    ctx.translate(24, 8);
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#d83434';
    ctx.shadowBlur = 0;
    ctx.fill();
    // Eyes
    ctx.beginPath();
    ctx.arc(-4, -2, 1.8, 0, 2 * Math.PI);
    ctx.arc(4, -2, 1.8, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-4, -2, 0.7, 0, 2 * Math.PI);
    ctx.arc(4, -2, 0.7, 0, 2 * Math.PI);
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.restore();
    // Tail
    ctx.save();
    ctx.translate(24, 34);
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.quadraticCurveTo(-16, 20, 0, 30);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#b72e2e';
    ctx.stroke();
    ctx.restore();
    return cvs;
})();

// Village spritesheet: 3 types (simple rectangles with roofs and details, 48x48)
const villageSpriteSheet = (() => {
    const size = 48;
    const cvs = document.createElement('canvas');
    cvs.width = size * 3;
    cvs.height = size;
    const ctx = cvs.getContext('2d');
    // House 1
    ctx.save();
    ctx.translate(24, 32);
    ctx.fillStyle = '#c2a369';
    ctx.fillRect(-16, -12, 32, 24);
    ctx.fillStyle = '#674e27';
    ctx.fillRect(-8, 0, 8, 12);
    ctx.fillStyle = '#a86a33';
    ctx.beginPath();
    ctx.moveTo(-18, -12);
    ctx.lineTo(0, -28);
    ctx.lineTo(18, -12);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // House 2
    ctx.save();
    ctx.translate(24 + 48, 32);
    ctx.fillStyle = '#b8a78d';
    ctx.fillRect(-16, -14, 32, 28);
    ctx.fillStyle = '#64563e';
    ctx.fillRect(4, 2, 8, 12);
    ctx.fillStyle = '#7f4921';
    ctx.beginPath();
    ctx.moveTo(-18, -14);
    ctx.lineTo(0, -32);
    ctx.lineTo(18, -14);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // House 3
    ctx.save();
    ctx.translate(24 + 96, 32);
    ctx.fillStyle = '#e7d7ad';
    ctx.fillRect(-20, -16, 40, 32);
    ctx.fillStyle = '#8a5f1a';
    ctx.fillRect(-10, 4, 10, 16);
    ctx.fillStyle = '#c17b38';
    ctx.beginPath();
    ctx.moveTo(-22, -16);
    ctx.lineTo(0, -36);
    ctx.lineTo(22, -16);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    return cvs;
})();

// Enemy sprite (simple archer/knight, 32x32)
const enemySprite = (() => {
    const size = 32;
    const cvs = document.createElement('canvas');
    cvs.width = cvs.height = size;
    const ctx = cvs.getContext('2d');
    // Body
    ctx.save();
    ctx.translate(16, 20);
    ctx.fillStyle = '#3e495d';
    ctx.beginPath();
    ctx.ellipse(0, 0, 10, 12, 0, 0, 2*Math.PI);
    ctx.shadowColor = '#222';
    ctx.shadowBlur = 3;
    ctx.fill();
    ctx.restore();
    // Head
    ctx.save();
    ctx.translate(16, 8);
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, 2*Math.PI);
    ctx.fillStyle = '#e4cfa4';
    ctx.shadowBlur = 0;
    ctx.fill();
    ctx.restore();
    // Bow
    ctx.save();
    ctx.translate(16, 22);
    ctx.beginPath();
    ctx.moveTo(7, 0);
    ctx.arc(0, 0, 7, 0, Math.PI, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#b18a60';
    ctx.stroke();
    ctx.restore();
    return cvs;
})();

// Environment tiles: grass, tree, river, rock (48x48 x 4)
const environmentTiles = (() => {
    const size = 48;
    const cvs = document.createElement('canvas');
    cvs.width = size * 4;
    cvs.height = size;
    const ctx = cvs.getContext('2d');
    // Grass
    ctx.save();
    ctx.translate(24, 24);
    ctx.fillStyle = '#99c47a';
    ctx.fillRect(-24, -24, 48, 48);
    ctx.restore();
    // Tree
    ctx.save();
    ctx.translate(24 + 48, 30);
    ctx.fillStyle = '#6c4c23';
    ctx.fillRect(-4, 0, 8, 18);
    ctx.beginPath();
    ctx.arc(0, -8, 18, 0, 2*Math.PI);
    ctx.fillStyle = '#3e8c37';
    ctx.fill();
    ctx.restore();
    // River
    ctx.save();
    ctx.translate(24 + 96, 24);
    ctx.fillStyle = '#7fcbf7';
    ctx.fillRect(-24, -24, 48, 48);
    ctx.beginPath();
    ctx.moveTo(-24, 12);
    ctx.bezierCurveTo(-12, 8, 12, 40, 24, 20);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#4a7eb7';
    ctx.stroke();
    ctx.restore();
    // Rock
    ctx.save();
    ctx.translate(24 + 144, 36);
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, 2*Math.PI);
    ctx.fillStyle = '#b0b0b0';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(7, 4, 6, 0, 2*Math.PI);
    ctx.fillStyle = '#888';
    ctx.fill();
    ctx.restore();
    return cvs;
})();

// Fire breath effect: gradient oval (32x16)
const fireBreathEffect = (() => {
    const cvs = document.createElement('canvas');
    cvs.width = 32;
    cvs.height = 16;
    const ctx = cvs.getContext('2d');
    const grad = ctx.createRadialGradient(16, 8, 3, 16, 8, 12);
    grad.addColorStop(0, '#ffe09d');
    grad.addColorStop(0.25, '#ffb64d');
    grad.addColorStop(0.65, '#ff7a1a');
    grad.addColorStop(1, 'rgba(255,80,8,0)');
    ctx.beginPath();
    ctx.ellipse(16, 8, 16, 8, 0, 0, 2*Math.PI);
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.82;
    ctx.fill();
    ctx.globalAlpha = 1;
    return cvs;
})();

// Explosion effect: radial gradient (32x32)
const explosionEffect = (() => {
    const cvs = document.createElement('canvas');
    cvs.width = cvs.height = 32;
    const ctx = cvs.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 3, 16, 16, 16);
    grad.addColorStop(0, '#fffad1');
    grad.addColorStop(0.32, '#ffe09d');
    grad.addColorStop(0.7, '#ffab1a');
    grad.addColorStop(1, 'rgba(255,80,8,0)');
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, 2*Math.PI);
    ctx.fillStyle = grad;
    ctx.fill();
    return cvs;
})();

// Sound effect generator: basic synth (returns Audio objects using Web Audio)
const AudioSynth = (() => {
    let ctx = null;
    function ensureCtx() {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        return ctx;
    }
    function playTone(freq, duration = 0.2, type = 'sine', gainVal = 0.15) {
        const c = ensureCtx();
        const o = c.createOscillator();
        const gain = c.createGain();
        o.type = type;
        o.frequency.value = freq;
        gain.gain.value = gainVal;
        o.connect(gain).connect(c.destination);
        o.start();
        o.stop(c.currentTime + duration);
        gain.gain.linearRampToValueAtTime(0.0001, c.currentTime + duration);
    }
    function dragonRoar() {
        const c = ensureCtx();
        const o = c.createOscillator();
        const gain = c.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(90, c.currentTime);
        o.frequency.linearRampToValueAtTime(50, c.currentTime + 0.5);
        gain.gain.value = 0.2;
        o.connect(gain).connect(c.destination);
        o.start();
        o.stop(c.currentTime + 0.5);
        gain.gain.linearRampToValueAtTime(0.0001, c.currentTime + 0.5);
    }
    function buildingCollapse() {
        playTone(72, 0.15, 'sawtooth', 0.2);
        setTimeout(() => playTone(54, 0.18, 'triangle', 0.14), 60);
        setTimeout(() => playTone(42, 0.25, 'triangle', 0.1), 120);
    }
    function uiClick() { playTone(800, 0.08, 'square', 0.10); }
    function backgroundMusic() {
        // One-time simple chiptune loop
        const c = ensureCtx();
        const now = c.currentTime;
        const notes = [220, 294, 349, 392, 220, 294, 349, 392, 349, 392, 440, 349, 392, 440, 392, 349];
        for (let i = 0; i < notes.length; ++i) {
            const o = c.createOscillator();
            const g = c.createGain();
            o.type = 'triangle';
            o.frequency.value = notes[i];
            g.gain.value = 0.045;
            o.connect(g).connect(c.destination);
            o.start(now + i * 0.33);
            o.stop(now + i * 0.33 + 0.3);
            g.gain.linearRampToValueAtTime(0.0001, now + i * 0.33 + 0.3);
        }
    }
    return {
        dragonRoar,
        buildingCollapse,
        uiClick,
        backgroundMusic
    };
})();

const Assets = {
    dragonSprite,
    villageSpriteSheet,
    enemySprite,
    environmentTiles,
    fireBreathEffect,
    explosionEffect,
    sounds: AudioSynth
};

window.Assets = Assets;