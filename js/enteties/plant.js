class Plant {
    constructor(
        x=Math.floor(Math.random()*mapSize.w), 
        y=Math.floor(Math.random()*mapSize.h), type=null) {

        
        if (type == null) {
            this.type = ["aloe", "tree"][Math.round(Math.random())];
        }else {
            this.type = "fig";
        }

        this.growState = 0;

        switch (this.type) {
            case "tree":
                this.ic = {
                    x: spriteSheetGridSize*4,
                    y: spriteSheetGridSize*5,
                    w: spriteSheetGridSize*2,
                    h: spriteSheetGridSize*2
                }
                break;
            case "aloe":
                this.ic = {
                    x: 0,
                    y: spriteSheetGridSize*6,
                    w: spriteSheetGridSize,
                    h: spriteSheetGridSize
                }
                break;
        }

        this.startPos = {
            x: x,
            y: y
        };

        while (mapArr[this.startPos.y][this.startPos.x] == "water") {
            this.startPos = {
                x: Math.floor(Math.random()*mapSize.w),
                y: Math.floor(Math.random()*mapSize.h)
            }
        }

        this.pos = {
            x: 0, 
            y: 0
        }
    }

    update() {
        this.pos.x = Math.round((this.startPos.x-pos.x)*1000)/1000;
        this.pos.y = Math.round((this.startPos.y-pos.y)*1000)/1000;

        /*if (this.growState < 3 && Math.random()*1000<3) {
            this.growState++;
        }*/

        c.drawImage(
            spriteSheet,
            this.ic.x,
            this.ic.y,
            this.ic.w,
            this.ic.h,
            Math.floor(this.pos.x*blockSize),
            Math.floor(this.pos.y*blockSize),
            this.ic.w/spriteSheetGridSize*blockSize,
            this.ic.h/spriteSheetGridSize*blockSize
        );
    }

    drawShadow() {
        if (this.type == "tree") {
            let a = 2;
        }else {
            let a = 1;
        }

        c.drawImage(
            spriteSheet,
            this.ic.x,
            this.ic.y+(spriteSheetGridSize*a),
            this.ic.w,
            this.ic.h,
            Math.floor(this.pos.x*blockSize),
            Math.floor(this.pos.y*blockSize),
            blockSize*2,
            blockSize*2
        );
    }
}