class ProjectileEntity {
    constructor(x, y, dx, dy, type = 'arrow', poweredUp = false) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.type = type;
        this.speed = (type === 'fire' ? (poweredUp?540:420) : 320);
        this.radius = (type === 'fire' ? (poweredUp?19:14) : 7);
        this.dead = false;
        this.timer = 0;
        this.poweredUp = poweredUp;
    }
    update(dt, entityManager) {
        this.x += this.dx * this.speed * dt;
        this.y += this.dy * this.speed * dt;
        this.timer += dt;
        // Remove if out of bounds
        if (this.x < 0 || this.x > 960 || this.y < 0 || this.y > 640) {
            this.dead = true;
        }
        // Collisions handled in collision_system.js (called from main loop)
    }
    draw(ctx) {
        if (this.type === 'fire') {
            const Assets = window.Assets || {};
            ctx.save();
            ctx.translate(this.x, this.y);
            let angle = Math.atan2(this.dy, this.dx);
            ctx.rotate(angle);
            ctx.globalAlpha = this.poweredUp ? 0.95 : 0.75;
            ctx.drawImage(Assets.fireBreathEffect, -16, -8, 32, 16);
            ctx.globalAlpha = 1;
            ctx.restore();
        } else if (this.type === 'arrow') {
            ctx.save();
            ctx.translate(this.x, this.y);
            let angle = Math.atan2(this.dy, this.dx);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(-12, -2);
            ctx.lineTo(8, 0);
            ctx.lineTo(-12, 2);
            ctx.lineTo(-10, 0);
            ctx.closePath();
            ctx.fillStyle = "#232140";
            ctx.strokeStyle = "#b8a78d";
            ctx.lineWidth = 2;
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    }
}
window.ProjectileEntity = ProjectileEntity;