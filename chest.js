class Chest {
    constructor(x=Math.floor(Math.random()*mapSize.w), y=Math.floor(Math.random()*mapSize.h)) {
        this.startPos = {
            x: x,
            y: y
        };
        this.pos = {
            x: x,
            y: y
        };
        this.ic = {
            x: 0,
            y: spriteSheetGridSize*3,
            w: spriteSheetGridSize,
            h: spriteSheetGridSize
        };
        this.isOpen = false;
        this.state = 2;
    }

    update() {
        this.pos.x = Math.round((this.startPos.x-pos.x)*1000)/1000;
        this.pos.y = Math.round((this.startPos.y-pos.y)*1000)/1000;

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

    open() {
        if (!this.isOpen) {
            for (let i = 0; i < Math.floor(Math.random()*2)+2; i++) {
                let cor = {
                    x: this.startPos.x+Math.floor(Math.random()*4)-2, 
                    y: this.startPos.y+Math.floor(Math.random()*4)-2
                }
                if (cor.x == this.pos.x && cor.y == this.pos.y) {
                    let cor = {
                        x: this.startPos.x+Math.floor(Math.random()*4)-2, 
                        y: this.startPos.y+Math.floor(Math.random()*4)-2
                    }
                }
                loot.push(new Loot(
                    this.startPos.x+Math.floor(Math.random()*4)-2, 
                    this.startPos.y+Math.floor(Math.random()*4)-2
                ));
            }
            this.isOpen = true;
            this.state = 1;
            this.ic.x = spriteSheetGridSize;
        }else {
            this.ic.x = 0;
            this.state = 2;
        }
    }
}