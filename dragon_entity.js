class DragonEntity {
    constructor() {
        this.x = 300;
        this.y = 480;
        this.vx = 0;
        this.vy = 0;
        this.speed = 240;
        this.health = 120;
        this.maxHealth = 120;
        this.fireCooldown = 0;
        this.fireRate = 0.13;
        this.isFiring = false;
        this.facing = 1; // 1 = right, -1 = left
        this.width = 48;
        this.height = 48;
        this.radius = 18;
        this.invulnTime = 0;
        this.score = 0;
        this.poweredUp = false;
        this.powerupTimer = 0;
    }
    update(dt, input, entityManager, levelManager, game) {
        let dx = 0, dy = 0;
        if (input.isKeyDown('arrowup') || input.isKeyDown('w')) dy -= 1;
        if (input.isKeyDown('arrowdown') || input.isKeyDown('s')) dy += 1;
        if (input.isKeyDown('arrowleft') || input.isKeyDown('a')) dx -= 1;
        if (input.isKeyDown('arrowright') || input.isKeyDown('d')) dx += 1;

        // Normalize
        if (dx || dy) {
            const len = Math.hypot(dx, dy);
            dx /= len, dy /= len;
        }
        this.x += dx * this.speed * dt;
        this.y += dy * this.speed * dt;

        // Clamp to play area
        this.x = Math.max(24, Math.min(936, this.x));
        this.y = Math.max(40, Math.min(600, this.y));

        // Facing
        if (dx > 0) this.facing = 1;
        if (dx < 0) this.facing = -1;

        // Fire breath
        this.fireCooldown -= dt;
        let fireInput = input.isKeyDown(' ') || input.mouseDown;
        if (fireInput && this.fireCooldown <= 0) {
            this.fire(entityManager, game);
            this.fireCooldown = this.fireRate;
        }

        // Powerup timer
        if (this.poweredUp) {
            this.powerupTimer -= dt;
            if (this.powerupTimer <= 0) {
                this.poweredUp = false;
                this.fireRate = 0.13;
            }
        }
        // Invuln timer
        if (this.invulnTime > 0) this.invulnTime -= dt;
    }
    fire(entityManager, game) {
        // Fire in facing direction; if mouse, towards mouse
        const input = game.inputHandler;
        let mx = input && input.mouseDown ? input.mousePos.x : (this.x + this.facing * 60);
        let my = input && input.mouseDown ? input.mousePos.y : this.y;
        let dx = mx - this.x, dy = my - this.y;
        let len = Math.hypot(dx, dy);
        if (!len) len = 1;
        dx /= len, dy /= len;
        for (let i=0; i<(this.poweredUp?3:1); ++i) {
            let spread = (this.poweredUp ? (i-1)*0.18 : 0);
            let angle = Math.atan2(dy, dx) + spread;
            let vx = Math.cos(angle), vy = Math.sin(angle);
            entityManager.addProjectile(new (window.ProjectileEntity||class{})(this.x+vx*30, this.y+vy*20, vx, vy, 'fire', this.poweredUp));
        }
        if (game.audioManager) game.audioManager.playDragonRoar();
    }
    draw(ctx) {
        const Assets = window.Assets || {};
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.facing, 1);
        if (this.invulnTime > 0 && Math.floor(this.invulnTime*20)%2) ctx.globalAlpha = 0.38;
        ctx.drawImage(Assets.dragonSprite, -24, -24);
        ctx.globalAlpha = 1;
        ctx.restore();
        // Powerup glow
        if (this.poweredUp) {
            ctx.save();
            ctx.globalAlpha = 0.24;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 34, 0, 2*Math.PI);
            ctx.fillStyle = "#ffe09d";
            ctx.shadowColor = "#ffb64d";
            ctx.shadowBlur = 22;
            ctx.fill();
            ctx.restore();
        }
    }
    takeDamage(amount) {
        if (this.invulnTime > 0) return;
        this.health -= amount;
        this.invulnTime = 1.0;
    }
    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }
    powerUp() {
        this.poweredUp = true;
        this.fireRate = 0.07;
        this.powerupTimer = 6.0;
    }
}
window.DragonEntity = DragonEntity;