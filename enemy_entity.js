class EnemyEntity {
    constructor(x, y, type = 0, patrol = null) {
        this.x = x;
        this.y = y;
        this.type = type || 0;
        this.width = 32;
        this.height = 32;
        this.radius = 14;
        this.state = 'idle';
        this.attackCooldown = 1.2 + Math.random()*0.5;
        this.patrol = patrol || null;
        this.patrolIndex = 0;
        this.patrolTimer = 0;
        this.dead = false;
        this.hp = 2;
        this.invuln = 0;
        this.arrowSpeed = 320;
    }
    update(dt, dragon, entityManager, game) {
        if (this.dead) return;
        // Patrol
        if (this.patrol && this.patrol.length > 1) {
            this.patrolTimer += dt;
            let next = this.patrol[(this.patrolIndex+1)%this.patrol.length];
            let dx = next.x - this.x, dy = next.y - this.y;
            let dist = Math.hypot(dx, dy);
            if (dist > 2) {
                let speed = 68;
                this.x += (dx/dist)*speed*dt;
                this.y += (dy/dist)*speed*dt;
            }
            if (dist < 6) {
                this.patrolIndex = (this.patrolIndex+1)%this.patrol.length;
            }
        }
        // Attack dragon if near
        let dx = dragon.x - this.x, dy = dragon.y - this.y;
        let dist = Math.hypot(dx, dy);
        if (dist < 340) {
            this.attackCooldown -= dt;
            if (this.attackCooldown <= 0) {
                this.attack(entityManager, dragon);
                this.attackCooldown = 1.0 + Math.random()*0.6;
            }
        }
        if (this.invuln > 0) this.invuln -= dt;
    }
    attack(entityManager, dragon) {
        let dx = dragon.x - this.x, dy = dragon.y - this.y;
        let dist = Math.hypot(dx, dy);
        if (!dist) dist = 1;
        dx /= dist; dy /= dist;
        entityManager.addProjectile(new (window.ProjectileEntity||class{})(this.x, this.y, dx, dy, 'arrow'));
    }
    draw(ctx) {
        const Assets = window.Assets || {};
        ctx.save();
        ctx.translate(this.x, this.y);
        if (this.invuln > 0 && Math.floor(this.invuln*18)%2) ctx.globalAlpha = 0.38;
        ctx.drawImage(Assets.enemySprite, -16, -16);
        ctx.globalAlpha = 1;
        ctx.restore();
    }
    takeDamage(amount) {
        if (this.invuln > 0) return;
        this.hp -= amount;
        this.invuln = 0.7;
        if (this.hp <= 0) this.dead = true;
    }
}
window.EnemyEntity = EnemyEntity;