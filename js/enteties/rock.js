class Rock {
    constructor(
        x=Math.floor(Math.random()*mapSize.w), 
        y=Math.floor(Math.random()*mapSize.h)) {


        this.ic = {
            x: spriteSheetGridSize*3,
            y: spriteSheetGridSize,
            w: spriteSheetGridSize,
            h: spriteSheetGridSize
        }
    
        this.startPos = {
            x: x,
            y: y
        };

        while (mapArr[this.startPos.y][this.startPos.x] == "water" || mapArr[this.startPos.y][this.startPos.x] == "sand") {
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

        /*rect(
            Math.floor(this.pos.x*blockSize),
            Math.floor(this.pos.y*blockSize), 
            blockSize, blockSize
        );*/

    }

    /*shadow() {

        c.drawImage(
            spriteSheet,
            this.ic.x,
            this.ic.y,
            this.ic.w,
            this.ic.h,
            Math.floor(this.pos.x*blockSize),
            Math.floor(this.pos.y*blockSize),
            blockSize,
            blockSize
        );
    }*/
}