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

function gameLoop() {
    
    nextTick = false;
    tick += tickSpeed;
    if (tick > 1) { nextTick = true; tick = 0; }

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

    if (!realPress && !mousePressed) {
        realPress = true;
    }

    for (let k = 0; k < mapSize.h; k++) {
        for (let l = 0; l < mapSize.w; l++) {
            mapArr[k][l].update();
        }
    }

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
                index = i;
            }
        }
    }
    if (index !== undefined) {
        wildlife.splice(index, 1);
    }

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

    pl.update();

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

    for (let i = 0; i < inventory.length; i++) {

        let _type = inventory[i];
        let _ic = getLootData(_type, "ic");

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
        0,
        spriteSheetGridSize,
        spriteSheetGridSize,
        spriteSheetGridSize,
        selected*inventoryCellSize+inventoryLeft,
        inventoryTop,
        inventoryCellSize,
        inventoryCellSize
    );

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
}

window.onload = function() {
    Main();
}