class PowerUpEntity {
    constructor(x, y, type = 'heal') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.radius = 16;
        this.timer = 0;
        this.lifetime = 11.5;
        this.dead = false;
    }
    update(dt, dragon, entityManager) {
        this.timer += dt;
        if (this.timer > this.lifetime) this.dead = true;
        // Collisions handled in collision_system.js
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        let t = Date.now()/200;
        if (this.type === 'heal') {
            ctx.beginPath();
            ctx.arc(0, 0, 15 + Math.sin(t)*2, 0, 2*Math.PI);
            ctx.globalAlpha = 0.74;
            ctx.fillStyle = "#2dd881";
            ctx.shadowColor = "#2dd881";
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.arc(0, 0, 8, 0, 2*Math.PI);
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(-3, -5); ctx.lineTo(-3, 5); ctx.lineTo(3, 5); ctx.lineTo(3, -5); ctx.closePath();
            ctx.fillStyle = "#2dd881";
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(-5, -3); ctx.lineTo(5, -3); ctx.lineTo(5, 3); ctx.lineTo(-5, 3); ctx.closePath();
            ctx.fillStyle = "#2dd881";
            ctx.fill();
        } else if (this.type === 'power') {
            ctx.beginPath();
            ctx.arc(0, 0, 15 + Math.cos(t)*2, 0, 2*Math.PI);
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "#ffe09d";
            ctx.shadowColor = "#ffb64d";
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.moveTo(0, -8);
            for (let i = 1; i < 8; i++) {
                let angle = i * Math.PI / 4;
                let r = i%2 === 0 ? 8 : 4;
                ctx.lineTo(Math.sin(angle)*r, -Math.cos(angle)*r);
            }
            ctx.closePath();
            ctx.fillStyle = "#ffb64d";
            ctx.fill();
        }
        ctx.restore();
    }
}
window.PowerUpEntity = PowerUpEntity;