class Loot {
    constructor(x=Math.floor(Math.random()*mapSize.w), y=Math.floor(Math.random()*mapSize.h), type=null) {

        this.startPos = {
            x: Math.round(x), 
            y: Math.round(y)
        };
        this.pos = {
            x: this.startPos.x,
            y: this.startPos.y
        };
        if (type != null) {
            this.type = type;
        }else {
            this.type = lootTypes[Math.floor(Math.random()*lootTypes.length)];
        }
        
        this.ic = getLootData(this.type, "ic");
    }

    update() {
        this.pos.x = Math.round((this.startPos.x-pos.x)*1000)/1000;
        this.pos.y = Math.round((this.startPos.y-pos.y)*1000)/1000;

        c.drawImage(
            item_spritesheet,
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