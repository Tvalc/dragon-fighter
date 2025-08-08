class VillageEntity {
    constructor(x, y, type = 0) {
        this.x = x;
        this.y = y;
        this.type = type || 0;
        this.width = 48;
        this.height = 48;
        this.radius = 20;
        this.health = 3;
        this.onFire = false;
        this.fireTimer = 0;
        this.destroyed = false;
        this.collapseFx = false;
    }
    update(dt, entityManager) {
        if (this.destroyed) return;
        if (this.onFire) {
            this.fireTimer -= dt;
            if (this.fireTimer <= 0) {
                this.health--;
                if (this.health <= 0) {
                    this.destroyed = true;
                    this.collapseFx = true;
                    if (window.Assets && window.Assets.sounds) window.Assets.sounds.buildingCollapse();
                    // Add explosion effect
                    if (entityManager && entityManager.addEffect) {
                        entityManager.addEffect({
                            x: this.x, y: this.y,
                            frame: 0, duration: 0.46,
                            draw(ctx) {
                                const eff = window.Assets ? window.Assets.explosionEffect : null;
                                if (eff) ctx.drawImage(eff, this.x-16, this.y-16);
                            },
                            update(dt) {
                                this.frame += dt;
                                if (this.frame > this.duration) this.dead = true;
                            }
                        });
                    }
                } else {
                    this.fireTimer = 0.35 + Math.random()*0.18;
                }
            }
        }
    }
    ignite() {
        if (this.destroyed || this.onFire) return;
        this.onFire = true;
        this.fireTimer = 0.48 + Math.random()*0.25;
    }
    draw(ctx) {
        const Assets = window.Assets || {};
        if (this.destroyed) {
            ctx.save();
            ctx.globalAlpha = 0.35;
            ctx.drawImage(Assets.villageSpriteSheet, this.type*48, 0, 48, 48, this.x-24, this.y-24, 48, 48);
            ctx.restore();
            return;
        }
        ctx.drawImage(Assets.villageSpriteSheet, this.type*48, 0, 48, 48, this.x-24, this.y-24, 48, 48);
        // Fire effect
        if (this.onFire) {
            ctx.save();
            for (let i=0;i<2;++i) {
                ctx.globalAlpha = 0.7 - Math.random()*0.25;
                ctx.drawImage(Assets.fireBreathEffect, this.x-16+Math.random()*12-6, this.y-16+Math.random()*8-4, 32, 16);
            }
            ctx.globalAlpha = 1;
            ctx.restore();
        }
    }
}
window.VillageEntity = VillageEntity;