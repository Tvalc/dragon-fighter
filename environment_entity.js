class EnvironmentEntity {
    constructor(x, y, type = 0) {
        this.x = x;
        this.y = y;
        this.type = type || 0; // 0: grass, 1: tree, 2: river, 3: rock
        this.width = 48;
        this.height = 48;
        this.radius = (this.type === 1 ? 20 : 18);
    }
    draw(ctx) {
        const Assets = window.Assets || {};
        ctx.save();
        ctx.drawImage(Assets.environmentTiles, this.type*48, 0, 48, 48, this.x-24, this.y-24, 48, 48);
        ctx.restore();
    }
}
window.EnvironmentEntity = EnvironmentEntity;