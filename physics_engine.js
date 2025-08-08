class PhysicsEngine {
    constructor() { }
    update(game, dt) {
        // Move dragon, enemies, projectiles
        if (window.EntityManager && game.entityManager) {
            game.entityManager.updateEntities(dt, game.inputHandler, game.levelManager);
        }
    }
}
window.PhysicsEngine = PhysicsEngine;