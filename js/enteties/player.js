class Player {
    constructor() {
        this.off = {x: Math.floor(screenSize.w/2), y: Math.floor(screenSize.h/2)};
        this.pos = {
            x: pos.x+this.off.x, 
            y: pos.y+this.off.y
        };
        this.dir = 1; // direction: 0 | 1
        this.ic = {
            x: spriteSheetGridSize*(1-this.dir), 
            y: spriteSheetGridSize*4, 
            w: spriteSheetGridSize, 
            h: spriteSheetGridSize
        };
        this.height = 1;

        this.health = 5;
        this.damage = 1;
    }

    update() {
        this.pos = {
            x: pos.x+this.off.x, 
            y: pos.y+this.off.y
        };
        if (canWalk) {
            try {
                if (mapArr[this.pos.y][this.pos.x] == "water") {
                    this.height = 0.7;
                }else {
                    this.height = 1;
                }
            } catch (error) {
                
            }
        }
        this.ic.x = spriteSheetGridSize*(1-this.dir);
        c.drawImage(
            spriteSheet,
            this.ic.x,
            this.ic.y,
            this.ic.w,
            this.ic.h*this.height,
            this.off.x*blockSize,
            this.off.y*blockSize,
            blockSize,
            blockSize*this.height
        );
    }
}