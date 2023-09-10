var pl = new Player;

var tick = 0;
var nextTick = false;
var tickSpeed = 0.03;

var dropLoot = false;

function getLootData(lootType, dataType) {
    let IC = {x: 0, y: 0, w: 0, h: 0};
    let DAMAGE = defaultDamage;
    switch (lootType) {
        case "potion_water":
            IC = {
                x: 0, 
                y: spriteSheetGridSize, 
                w: spriteSheetGridSize, 
                h: spriteSheetGridSize
            };
            break;
        case "potion_poison":
            IC = {
                x: spriteSheetGridSize, 
                y: spriteSheetGridSize, 
                w: spriteSheetGridSize, 
                h: spriteSheetGridSize
            };
            break;
        case "sword_flint":
            IC = {
                x: 0, 
                y: spriteSheetGridSize*2, 
                w: spriteSheetGridSize, 
                h: spriteSheetGridSize
            };
            DAMAGE = 1.25;
            break;
        case "sword_quartz":
            IC = {
                x: spriteSheetGridSize, 
                y: spriteSheetGridSize*2, 
                w: spriteSheetGridSize, 
                h: spriteSheetGridSize
            };
            DAMAGE = 1.5;
            break;
        case "sword_carbon":
            IC = {
                x: spriteSheetGridSize*2, 
                y: spriteSheetGridSize*2, 
                w: spriteSheetGridSize, 
                h: spriteSheetGridSize
            }
            DAMAGE = 1.75;
            break;
        case "apple":
            IC = {
                x: 0,
                y: 0,
                w: spriteSheetGridSize,
                h: spriteSheetGridSize
            };
            break;
        case "meat_bear":
            IC = {
                x: 0, 
                y: spriteSheetGridSize*3, 
                w: spriteSheetGridSize, 
                h: spriteSheetGridSize
            };
            break;
        case "feathers":
            IC = {
                x: spriteSheetGridSize,
                y: spriteSheetGridSize*3,
                w: spriteSheetGridSize,
                h: spriteSheetGridSize
            };
            break;
        case "meat_rabbit":
            IC = {
                x: spriteSheetGridSize*2,
                y: spriteSheetGridSize*3,
                w: spriteSheetGridSize,
                h: spriteSheetGridSize
            };
            break;
        case "shell_turtle":
            IC = {
                x: spriteSheetGridSize*3,
                y: spriteSheetGridSize*3,
                w: spriteSheetGridSize,
                h: spriteSheetGridSize
            };
            break;
        case "slime":
            IC = {
                x: spriteSheetGridSize*4,
                y: spriteSheetGridSize*3,
                w: spriteSheetGridSize,
                h: spriteSheetGridSize
            };
            break;
        default:
            IC = {
                x: 0, 
                y: spriteSheetGridSize*4, 
                w: spriteSheetGridSize, 
                h: spriteSheetGridSize
            };
            break;
    }
    switch (dataType) {
        case "ic":
            return IC;
            break;
        case "damage":
            return Math.round(DAMAGE*1000)/1000;
            break;
    }
}

function blockIc(blocktype) {
    this.ic = {x: 0, y: 0, w: 0, h: 0};
    switch (blocktype) {
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
        case "jungle_grass":
        this.ic = {
            x: spriteSheetGridSize*5, 
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
    return this.ic;
}

function gameLoop() {
    
    nextTick = false;
    tick += tickSpeed;
    if (tick > 1) { nextTick = true; tick = 0; }

    //walk

    pos.x = Math.round(pos.x*10000)/10000;
    pos.y = Math.round(pos.y*10000)/10000;
    
    if (vel.x > 0) {
        pos.x += speed;
        vel.x -= speed;
        vel.x = Math.round(vel.x*100)/100;
    }else if (vel.x < 0) {
        pos.x -= speed;
        vel.x += speed;
        vel.x = Math.round(vel.x*100)/100;
    }
    if (vel.y > 0) {
        pos.y += speed;
        vel.y -= speed;
        vel.y = Math.round(vel.y*100)/100;
    }else if (vel.y < 0) {
        pos.y -= speed;
        vel.y += speed;
        vel.y = Math.round(vel.y*100)/100;
    }

    if (vel.x == 0 && vel.y == 0 && !canWalk) {
        canWalk = true;
    }

    c.clearRect(0, 0, canvas.width, canvas.height);

    //Mousepress

    if (!realPress && !mousePressed) {
        realPress = true;
    }

    for (let i = Math.floor(pos.y)-1; i < Math.floor(pos.y)+screenSize.h+1; i++) {
        for (let j = Math.floor(pos.x)-1; j < Math.floor(pos.x)+screenSize.w+1; j++) {
            try {
                let ___ic = blockIc(mapArr[i][j]);
                c.drawImage(
                    spriteSheet,
                    ___ic.x,
                    ___ic.y,
                    ___ic.w,
                    ___ic.h,
                    (j-pos.x)*blockSize,
                    (i-pos.y)*blockSize,
                    blockSize,
                    blockSize
                );
            } catch (error) {
                
            }
        }
    }

    //chests
    for (let i = 0; i < chests.length; i++) {
        chests[i].update();
        if (
            sl.touches(
            chests[i].pos.x*blockSize, 
            chests[i].pos.y*blockSize, 
            blockSize, blockSize, 
            cursorPos.x,
            cursorPos.y,
            cursorSize, cursorSize
            ) 
            && 
            sl.touches(
                0, 0, canvas.width, canvas.height,
                cursorPos.x, cursorPos.y, cursorSize, cursorSize
            )
            &&
            mousePressed
            &&
            realPress
        ) {
            chests[i].open();
            if (chests[i].state < 2) {
                realPress = false;
            }
        }
    }

    //wildlife
    let index = undefined;
    for (let i = 0; i < wildlife.length; i++) {
        wildlife[i].update();
        if (
            sl.touches(
            wildlife[i].pos.x*blockSize, 
            wildlife[i].pos.y*blockSize, 
            blockSize, blockSize, 
            cursorPos.x,
            cursorPos.y,
            cursorSize, cursorSize
            )
            &&
            mousePressed
            &&
            realPress
        ) {
            wildlife[i].health -= pl.damage;
            realPress = false;
            if (wildlife[i].health <= 0) {
                switch (wildlife[i].type) {
                    case "bear":
                        loot.push(new Loot(Math.round(wildlife[i].startPos.x), 
                        Math.round(wildlife[i].startPos.y), "meat_bear"));
                        break;
                    case "rabbit":
                        loot.push(new Loot(Math.round(wildlife[i].startPos.x), 
                        Math.round(wildlife[i].startPos.y), "meat_rabbit"));
                        break;
                    case "sanderling":
                        loot.push(new Loot(Math.round(wildlife[i].startPos.x), 
                        Math.round(wildlife[i].startPos.y), "feathers"));
                        break;
                    case "frog":
                        loot.push(new Loot(Math.round(wildlife[i].startPos.x), 
                        Math.round(wildlife[i].startPos.y), "slime"));
                        break;
                    case "turtle":
                        loot.push(new Loot(Math.round(wildlife[i].startPos.x), 
                        Math.round(wildlife[i].startPos.y), "shell_turtle"));
                        break;
                }
                
                index = i;
            }
        }
    }
    if (index !== undefined) {
        wildlife.splice(index, 1);
    }

    //loot

    let sel;
    for (let m = loot.length-1; m >= 0; m--) {
        loot[m].update();
        if (
            sl.touches(
            loot[m].pos.x, 
            loot[m].pos.y, 
            1, 1, 
            cursorPos.X,
            cursorPos.Y,
            1, 1
            ) 
            &&
            mousePressed
            &&
            realPress
            &&
            !rightClick
            &&
            !shiftPress
        ) {
            if (inventory[selected] != null) {
                dropLoot = true;
                sel = inventory[selected];
            }
            inventory[selected] = loot[m].type;
            pl.damage = getLootData(inventory[selected], "damage");
            loot.splice(m, 1);
            realPress = false;
        }
    }
    if (dropLoot) {
        loot.push(
            new Loot(
                Math.floor((cursorPos.X+pos.x)), 
                Math.floor((cursorPos.Y+pos.y)),
                sel
        ));
    }
    dropLoot = false;
    
    //plant
    /*for (let i = 0; i < plants.length; i++) {
        plants[i].shadow();
    }*/

    for (let i = 0; i < plants.length; i++) {
        if (plants[i].type == "aloe") {
            plants[i].update();
        }
    }

    for (let i = 0; i < rocks.length; i++) {
        rocks[i].update();
    }

    //player
    pl.update();

    //plant
    for (let i = 0; i < plants.length; i++) {
        if (plants[i].type == "tree" || plants[i].type == "jungle_tree") {
            plants[i].update();
        }
    }

    c.globalAlpha = Math.abs(time-12)/16;
    c.fillStyle = "#0B000F";
    c.fillRect(0,0,canvas.width,canvas.height);
    c.globalAlpha = 1.0;

    //cursor
    c.drawImage(
        spriteSheet,
        0,
        spriteSheetGridSize*2,
        spriteSheetGridSize/20*8,
        spriteSheetGridSize/20*8,
        cursorPos.x,
        cursorPos.y,
        cursorSize,
        cursorSize
    );
    c.drawImage(
        spriteSheet,
        spriteSheetGridSize*3,
        spriteSheetGridSize*3,
        spriteSheetGridSize,
        spriteSheetGridSize,
        Math.floor(cursorPos.x/blockSize)*blockSize,
        Math.floor(cursorPos.y/blockSize)*blockSize,
        blockSize,
        blockSize
    );

    //inventory
    for (let i = 0; i < inventory.length; i++) {

        let _type = inventory[i];
        let _ic = getLootData(_type, "ic");

        if (inventory[i] != null) {
            c.drawImage(
                item_spritesheet,
                _ic.x,
                _ic.y,
                _ic.w,
                _ic.h,
                i*inventoryCellSize+inventoryLeft,
                inventoryTop,
                inventoryCellSize,
                inventoryCellSize
            );
        }

        c.drawImage(
            spriteSheet,
            spriteSheetGridSize,
            spriteSheetGridSize,
            spriteSheetGridSize,
            spriteSheetGridSize,
            i*inventoryCellSize+inventoryLeft,
            inventoryTop,
            inventoryCellSize,
            inventoryCellSize
        );
    }

    //health bar
    for (let i = 0; i < hp; i++) {
        c.drawImage(
            spriteSheet,
            0,
            spriteSheetGridSize*5,
            spriteSheetGridSize,
            spriteSheetGridSize,
            i*healthBarCellSize+healthBarLeft,
            healthBarTop,
            healthBarCellSize,
            healthBarCellSize
        );
    }
    
    c.drawImage(
        spriteSheet,
        0,
        spriteSheetGridSize,
        spriteSheetGridSize,
        spriteSheetGridSize,
        selected*inventoryCellSize+inventoryLeft,
        inventoryTop,
        inventoryCellSize,
        inventoryCellSize
    );

    if (minimap) {
        for (let i = 0; i < mapArr.length; i+=2) {
            for (let j = 0; j < mapArr[i].length; j+=2) {
                switch (mapArr[i][j]) {
                    case "grass":
                        c.fillStyle = "#2B8A2C";
                        c.fillRect(j*2, i*2, 4, 4);
                        break;
                    case "jungle_grass":
                        c.fillStyle = "#134a39";
                        c.fillRect(j*2, i*2, 4, 4);
                        break;
                    case "sand":
                        try {
                            if (mapArr[i+2][j] == "grass" || mapArr[i-2][j] == "grass" || mapArr[i][j+2] == "grass" || mapArr[i][j-2] == "grass") {
                                c.fillStyle = "#c4a962";
                                c.fillRect(j*2, i*2, 4, 4);
                            }else {
                                c.fillStyle = "#EBCE81";
                                c.fillRect(j*2, i*2, 4, 4);
                            }
                        } catch (error) {
                            c.fillStyle = "#EBCE81";
                            c.fillRect(j*2, i*2, 4, 4);
                        }
                        break;
                    case "water":
                        c.fillStyle = "#22AACC";
                        c.fillRect(j*2, i*2, 4, 4);
                        break;
                }
                
            }
        }
        
    
    
        c.fillStyle = "#000000";
        c.fillRect((pl.pos.x)*2, (pl.pos.y)*2, 2, 2);
    
        for (let i = 0; i < wildlife.length; i++) {
            c.fillStyle = "#BB0000";
            c.fillRect((wildlife[i].startPos.x)*2, (wildlife[i].startPos.y)*2, 2, 2);
        }
    }

    //walk
    if (canWalk && vel.x == 0 && vel.y == 0) {
            //keys
            if (keys.a && !keys.w && !keys.s) {
                vel.x = -1;
                canWalk = false;
                pl.dir = 0;
            }if (keys.d && !keys.w && !keys.s) {
                vel.x = 1;
                canWalk = false;
                pl.dir = 1;
            }if (keys.w && !keys.a && !keys.d) {
                vel.y = -1;
                canWalk = false;
            }if (keys.s && !keys.a && !keys.d) {
                vel.y = 1;
                canWalk = false;
            }
    }

    mousePressed = false;

    time += 0.005;
    if (time > 24) {
        time = 0;
    }

    if (pos.x < 1) {
        pos.x = 1;
    }else if (pos.x > mapArr[0].length-screenSize.w-1) {
        pos.x = mapArr[0].length-screenSize.w-1;
    }
    if (pos.y < 1) {
        pos.y = 1;
    }else if (pos.y > mapArr.length-screenSize.h-1) {
        pos.y = mapArr.length-screenSize.h-1;
    }
}

window.onload = function() {
    Main();
}