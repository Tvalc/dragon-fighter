class EntityManager {
    constructor(game) {
        this.game = game;
        this.reset();
    }
    reset() {
        this.dragon = new (window.DragonEntity || class{})();
        this.villages = [];
        this.enemies = [];
        this.projectiles = [];
        this.effects = [];
        this.environment = [];
        this.powerups = [];
    }
    spawnVillages(villageConfigs) {
        this.villages = [];
        const VillageEntity = window.VillageEntity || class {};
        for (const cfg of villageConfigs) {
            this.villages.push(new VillageEntity(cfg.x, cfg.y, cfg.type));
        }
    }
    spawnEnemies(enemyConfigs) {
        this.enemies = [];
        const EnemyEntity = window.EnemyEntity || class {};
        for (const cfg of enemyConfigs) {
            this.enemies.push(new EnemyEntity(cfg.x, cfg.y, cfg.type, cfg.patrol));
        }
    }
    spawnEnvironment(envConfigs) {
        this.environment = [];
        const EnvironmentEntity = window.EnvironmentEntity || class {};
        for (const cfg of envConfigs) {
            this.environment.push(new EnvironmentEntity(cfg.x, cfg.y, cfg.type));
        }
    }
    spawnPowerUp(x, y, type) {
        if (window.PowerUpEntity) {
            this.powerups.push(new window.PowerUpEntity(x, y, type));
        }
    }
    addProjectile(proj) {
        this.projectiles.push(proj);
    }
    addEffect(effect) {
        this.effects.push(effect);
    }
    updateEntities(dt, input, levelManager) {
        // Dragon
        if (this.dragon && this.dragon.update) {
            this.dragon.update(dt, input, this, levelManager, this.game);
        }
        // Villages: update fire status
        for (const v of this.villages) if (v.update) v.update(dt, this);
        // Enemies
        for (const e of this.enemies) if (e.update) e.update(dt, this.dragon, this, this.game);
        // Projectiles
        for (const p of this.projectiles) if (p.update) p.update(dt, this);
        // Effects
        for (const fx of this.effects) if (fx.update) fx.update(dt, this);
        // Powerups
        for (const p of this.powerups) if (p.update) p.update(dt, this.dragon, this);
        // Remove dead projectiles/effects/powerups
        this.projectiles = this.projectiles.filter(p => !p.dead);
        this.effects = this.effects.filter(fx => !fx.dead);
        this.powerups = this.powerups.filter(p => !p.dead);
    }
    drawDragon(ctx) { if (this.dragon && this.dragon.draw) this.dragon.draw(ctx); }
    drawVillages(ctx) { for (const v of this.villages) if (v.draw) v.draw(ctx); }
    drawEnemies(ctx) { for (const e of this.enemies) if (e.draw) e.draw(ctx); }
    drawProjectiles(ctx) { for (const p of this.projectiles) if (p.draw) p.draw(ctx); }
    drawEffects(ctx) { for (const fx of this.effects) if (fx.draw) fx.draw(ctx); }
    drawEnvironment(ctx) { for (const e of this.environment) if (e.draw) e.draw(ctx); }
    drawPowerUps(ctx) { for (const p of this.powerups) if (p.draw) p.draw(ctx); }
}
window.EntityManager = EntityManager;