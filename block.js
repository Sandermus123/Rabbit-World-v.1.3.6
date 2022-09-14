class Block {
    constructor(ix, iy, rand) {
        this.index = {x: ix, y: iy};
        this.pos = {x: (this.index.x-pos.x), y: (this.index.y-pos.y)};
        this.rand = rand;
        this.block = "";

        if (this.rand > seaHeight) {
            this.block = "grass";
        }else if (this.rand < seaHeight && this.rand > seaHeight-0.3) {
            this.block = "sand";
        }else {
            this.block = "water";
        }
        
        switch (this.block) {
            case "grass":
                this.ic = {
                    x: 0, 
                    y: 0, 
                    w: spriteSheetGridSize, 
                    h: spriteSheetGridSize
                };
                break;
            case "water":
                this.ic = {
                    x: spriteSheetGridSize, 
                    y: 0, 
                    w: spriteSheetGridSize, 
                    h: spriteSheetGridSize
                };
                break;
            case "sand":
                this.ic = {
                    x: spriteSheetGridSize*4, 
                    y: 0, 
                    w: spriteSheetGridSize, 
                    h: spriteSheetGridSize};
                break;
            default:
                this.ic = {
                    x: spriteSheetGridSize*3, 
                    y: 0, 
                    w: spriteSheetGridSize, 
                    h: spriteSheetGridSize};
                break;
        }
    }
    update() {
        this.pos = {x: (this.index.x-pos.x), y: (this.index.y-pos.y)};
                c.drawImage(
                    spriteSheet,
                    this.ic.x,
                    this.ic.y,
                    this.ic.w,
                    this.ic.h,
                    this.pos.x*blockSize,
                    this.pos.y*blockSize,
                    blockSize,
                    blockSize
                );
    }
}