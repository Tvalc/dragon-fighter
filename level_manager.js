class LevelManager {
    constructor() {
        this.level = 1;
        this.maxLevels = 2;
    }
    getLevel() { return this.level; }
    nextLevel() {
        this.level++;
        if (this.level > this.maxLevels) this.level = this.maxLevels;
    }
    getLevelConfig() {
        // Returns {villages:[], enemies:[], environment:[]}
        if (this.level === 1) {
            return {
                villages: [
                    {x:220, y:160, type:0},
                    {x:670, y:350, type:1},
                    {x:410, y:240, type:2},
                    {x:800, y:180, type:1}
                ],
                enemies: [
                    {x:180, y:180, type:0, patrol:[{x:160,y:160},{x:200,y:200}]},
                    {x:670, y:380, type:0, patrol:[{x:670,y:350},{x:700,y:380}]},
                ],
                environment: [
                    {x:280, y:200, type:1},
                    {x:550, y:340, type:1},
                    {x:370, y:320, type:2},
                    {x:800, y:100, type:3},
                    {x:320, y:500, type:0 }
                ]
            };
        } else {
            return {
                villages: [
                    {x:250, y:120, type:0},
                    {x:770, y:320, type:1},
                    {x:430, y:210, type:2},
                    {x:630, y:120, type:0},
                    {x:550, y:370, type:1},
                    {x:300, y:340, type:2}
                ],
                enemies: [
                    {x:230, y:240, type:0, patrol:[{x:220,y:240},{x:260,y:180}]},
                    {x:710, y:420, type:0, patrol:[{x:710,y:420},{x:740,y:380}]},
                    {x:430, y:410, type:0, patrol:[{x:430,y:410},{x:470,y:410}]},
                ],
                environment: [
                    {x:320, y:200, type:1},
                    {x:650, y:340, type:1},
                    {x:470, y:320, type:2},
                    {x:200, y:100, type:3},
                    {x:800, y:180, type:0 },
                    {x:400, y:350, type:3}
                ]
            };
        }
    }
    isLastLevel() { return this.level === this.maxLevels; }
    reset() { this.level = 1; }
}
window.LevelManager = LevelManager;