class Renderer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    render(game) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw environment
        if (window.EntityManager && game.entityManager) {
            game.entityManager.drawEnvironment(ctx);
            // Draw villages
            game.entityManager.drawVillages(ctx);
            // Draw powerups
            game.entityManager.drawPowerUps(ctx);
            // Draw dragon
            game.entityManager.drawDragon(ctx);
            // Draw enemies
            game.entityManager.drawEnemies(ctx);
            // Draw projectiles
            game.entityManager.drawProjectiles(ctx);
            // Draw effects
            game.entityManager.drawEffects(ctx);
        }
        // Optionally draw overlays (pause, menus, etc) in ui_manager.js
    }
}

window.Renderer = Renderer;