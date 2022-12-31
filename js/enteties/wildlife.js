class Animal {
    constructor(type=Math.floor(Math.random()*wildlifeTypes.length), x=Math.floor(Math.random()*mapSize.w), y=Math.floor(Math.random()*mapSize.h)) {

        this.startPos = {
            x: x, 
            y: y
        };

        while (mapArr[this.startPos.y][this.startPos.x].block == "water") {
            this.startPos.x = Math.floor(Math.random()*mapSize.w);
            this.startPos.y = Math.floor(Math.random()*mapSize.h);
        }

        this.pos = {
            x: this.startPos.x,
            y: this.startPos.y
        };

        this.variation = Math.round(Math.random());

        this.type = wildlifeTypes[type];

        this.health = 0;
        this.range = 0;
        this.damage = 0;

        switch (this.type) {
            case "bear":
                this.ic = {
                    x: 0, 
                    y: spriteSheetGridSize, 
                    w: spriteSheetGridSize, 
                    h: spriteSheetGridSize
                };
                this.health = 10;
                this.range = 10;
                this.damage = 3
                break;
            case "rabbit":
                if (this.variation == 0) {
                    this.ic = {
                        x: 0, 
                        y: 0, 
                        w: spriteSheetGridSize, 
                        h: spriteSheetGridSize
                    };
                }else {
                    this.ic = {
                        x: spriteSheetGridSize*2, 
                        y: 0, 
                        w: spriteSheetGridSize, 
                        h: spriteSheetGridSize
                    };
                }
                this.health = 4;
                this.range = 8;
                this.damage = 1;
                break;
            case "sanderling":
                this.ic = {
                    x: 0, 
                    y: spriteSheetGridSize*2, 
                    w: spriteSheetGridSize, 
                    h: spriteSheetGridSize
                };
                this.health = 3;
                this.range = 6;
                this.damage = 2;
                break;
            case "turtle":
                this.ic = {
                    x: 0, 
                    y: spriteSheetGridSize*3, 
                    w: spriteSheetGridSize, 
                    h: spriteSheetGridSize
                };
                this.health = 5;
                this.range = 3;
                this.damage = 1;
                break;
            case "frog":
                this.ic = {
                    x: 0, 
                    y: spriteSheetGridSize*4, 
                    w: spriteSheetGridSize, 
                    h: spriteSheetGridSize
                };
                this.health = 2;
                this.range = 15;
                this.damage = 2;
                break;
            default:
                this.ic = {
                    x: 0, 
                    y: spriteSheetGridSize*3, 
                    w: spriteSheetGridSize, 
                    h: spriteSheetGridSize};
                break;
        }
        this.dir = 0;

        this.goTo = {
            x: this.startPos.x+Math.floor(Math.random()*16)-8, 
            y: this.startPos.y+Math.floor(Math.random()*16)-8
        };

        this.speed = 1;
        this.vel = {x: 0, y: 0};
        this.rn = Math.round(Math.random());

        this.speed = 0.25;

    }

     

    update () {

        this.pos.x = Math.round((this.startPos.x-pos.x)*1000)/1000;
        this.pos.y = Math.round((this.startPos.y-pos.y)*1000)/1000;

        c.drawImage(
            animal_spritesheet,
            this.ic.x+spriteSheetGridSize*this.dir,
            this.ic.y,
            this.ic.w,
            this.ic.h,
            Math.floor(this.pos.x*blockSize),
            Math.floor(this.pos.y*blockSize),
            blockSize,
            blockSize
        );

        this.#behave();

        if (sl.touches(this.startPos.x, this.startPos.y, 1, 1, pl.pos.x, pl.pos.y, 1, 1) && nextTick) {
            hp--;
        }
    }

    #behave() {

        //Direction
        if (this.goTo.x >= this.startPos.x) {
            this.dir = 0;
        }else {
            this.dir = 1;
        }

        //Go to goTo
        if (this.goTo.x > this.startPos.x && this.rn == 0) {

            this.startPos.x += speed*this.speed;
            this.startPos.x = Math.round(this.startPos.x*1000)/1000;

        }else if (this.goTo.x < this.startPos.x && this.rn == 0) {

            this.startPos.x -= speed*this.speed;
            this.startPos.x = Math.round(this.startPos.x*1000)/1000;

        }

        if (this.goTo.y > this.startPos.y && this.rn == 1) {

            this.startPos.y += speed*this.speed;
            this.startPos.y = Math.round(this.startPos.y*1000)/1000;

        }else if (this.goTo.y < this.startPos.y && this.rn == 1) {

            this.startPos.y -= speed*this.speed;
            this.startPos.y = Math.round(this.startPos.y*1000)/1000;

        }

        if (this.startPos.x == Math.floor(this.startPos.x) && this.rn == 0) {
            this.rn = Math.round(Math.random());
        }else if (this.startPos.y == Math.floor(this.startPos.y) && this.rn == 1) {
            this.rn = Math.round(Math.random());
        }

        //New goTo
        if (this.startPos.x == this.goTo.x && this.startPos.y == this.goTo.y) {

            if (
                Math.abs(
                    Math.floor(
                        Math.sqrt(
                            Math.pow(pl.pos.x-this.startPos.x, 2) + 
                            Math.pow(pl.pos.y-this.startPos.y, 2)
                        )
                    )
                ) <= this.range
                ) {
                this.goT = {
                    x: Math.floor(pl.pos.x), 
                    y: Math.floor(pl.pos.y)
                };
                

            }else {
                this.goT = {
                    x: Math.round(this.startPos.x+Math.floor(Math.random()*16)-8), 
                    y: Math.round(this.startPos.y+Math.floor(Math.random()*16)-8)
                };

        
                try {
                    for (let i = 0; i < 10; i++) {
                    if (mapArr[Math.round(this.goT.y)][Math.round(this.goTo.x)].block == "water") {
                        
                        this.goT = {
                            x: Math.round(this.startPos.x+Math.floor(Math.random()*16)-8), 
                            y: Math.round(this.startPos.y+Math.floor(Math.random()*16)-8)
                        };
                        
                    }
                }

                this.goT = {
                    x: clamp(Math.round(this.startPos.x+Math.floor(Math.random()*90)-45), 0, mapArr[0].length-1), 
                    y: clamp(Math.round(this.startPos.y+Math.floor(Math.random()*90)-45), 0, mapArr.length-1)
                };
                
                for (let i = 0; i < 10; i++) {
                    if (mapArr[Math.round(this.goT.y)][Math.round(this.goTo.x)].block == "water") {
                        
                        this.goT = {
                            x: clamp(Math.round(this.startPos.x+Math.floor(Math.random()*90)-45), 0, mapArr[0].length-1), 
                            y: clamp(Math.round(this.startPos.y+Math.floor(Math.random()*90)-45), 0, mapArr.length-1)
                        };
                        
                    }
                }
            }catch(error) {};

            }
            
                this.goTo.x = this.goT.x;
                this.goTo.y = this.goT.y;
            
        }
    }
}