class CollisionSystem {
    constructor(game) {
        this.game = game;
    }
    update() {
        const em = this.game.entityManager;
        const dragon = em.dragon;

        // Dragon/enemy projectiles
        for (const proj of em.projectiles) {
            if (proj.type === 'arrow' && !proj.dead) {
                let dx = proj.x - dragon.x, dy = proj.y - dragon.y;
                if (Math.hypot(dx, dy) < dragon.radius + proj.radius) {
                    proj.dead = true;
                    dragon.takeDamage(15);
                    if (dragon.health <= 0) {
                        this.game.endGame(false);
                    }
                }
            }
        }
        // Dragon fire projectiles
        for (const proj of em.projectiles) {
            if (proj.type === 'fire' && !proj.dead) {
                // Hit villages
                for (const v of em.villages) {
                    if (!v.destroyed && !v.onFire) {
                        let dx = proj.x - v.x, dy = proj.y - v.y;
                        if (Math.hypot(dx, dy) < v.radius + proj.radius) {
                            v.ignite();
                            proj.dead = true;
                        }
                    }
                }
                // Hit enemies
                for (const e of em.enemies) {
                    if (!e.dead) {
                        let dx = proj.x - e.x, dy = proj.y - e.y;
                        if (Math.hypot(dx, dy) < e.radius + proj.radius) {
                            e.takeDamage(proj.poweredUp ? 2 : 1);
                            proj.dead = true;
                            if (e.dead && this.game.scoreManager) this.game.scoreManager.add(25);
                        }
                    }
                }
            }
        }
        // Dragon collides with powerups
        for (const pu of em.powerups) {
            let dx = pu.x - dragon.x, dy = pu.y - dragon.y;
            if (Math.hypot(dx, dy) < pu.radius + dragon.radius) {
                if (pu.type === 'heal') dragon.heal(34);
                if (pu.type === 'power') dragon.powerUp();
                pu.dead = true;
            }
        }
    }
}
window.CollisionSystem = CollisionSystem;