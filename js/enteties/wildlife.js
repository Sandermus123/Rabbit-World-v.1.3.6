class Animal {
    constructor(type="bear", x=Math.floor(Math.random()*mapSize.w), y=Math.floor(Math.random()*mapSize.h)) {
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

        this.type = type;
        switch (this.type) {
            case "bear":
                this.ic = {
                    x: spriteSheetGridSize, 
                    y: spriteSheetGridSize, 
                    w: spriteSheetGridSize, 
                    h: spriteSheetGridSize
                };
                break;
            case "rabbit":
                this.ic = {
                    x: spriteSheetGridSize, 
                    y: 0, 
                    w: spriteSheetGridSize, 
                    h: spriteSheetGridSize
                };
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

        this.health = 0;

        switch (this.type) {
            case "rabbit":
                this.health = 4;
                break;
            case "bear":
                this.health = 10;
                break;
            case "sanderling":
                this.health = 3;
                break;
        }
    }

    update () {

        this.pos.x = Math.round((this.startPos.x-pos.x)*1000)/1000;
        this.pos.y = Math.round((this.startPos.y-pos.y)*1000)/1000;

        c.drawImage(
            animal_spritesheet,
            this.ic.x*this.dir,
            this.ic.y,
            this.ic.w,
            this.ic.h,
            Math.floor(this.pos.x*blockSize),
            Math.floor(this.pos.y*blockSize),
            blockSize,
            blockSize
        );
        
        //this.#behave();
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

            let goT = {
                x: parseInt(Math.round(this.startPos.x+Math.floor(Math.random()*16)-8)), 
                y: parseInt(Math.round(this.startPos.y+Math.floor(Math.random()*16)-8))
            };

            for (let i = 0; i < 10; i++) {
                if (mapArr[Math.round(goT.y)][Math.round(this.goTo.x)].block == "water") {
                    goT = {
                        x: parseInt(Math.round(this.startPos.x+Math.floor(Math.random()*16)-8)), 
                        y: parseInt(Math.round(this.startPos.y+Math.floor(Math.random()*16)-8))
                    };
                }
            }

            if (typeof goT.x == "number") {
                this.goTo.x = goT.x;
                this.goTo.y = goT.y;
            }
        }
    }
}