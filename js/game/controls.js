var key;
document.addEventListener("keypress", event => {
    key = event.key;
    
    switch (key) {
        case "q":
            if (inventory[selected] != null) {
                loot.push(new Loot(
                    pos.x+cursorPos.X, 
                    pos.y+cursorPos.Y, 
                    inventory[selected]
                ));
                inventory[selected] = null;
            }
            break;
        
        case "e":
            switch (inventory[selected]) {
                case "meat_bear":

                    if (hp < 3) {
                        hp += 3;
                        inventory[selected] = null;
                    }else if (hp == 3) {
                        hp += 2;
                        inventory[selected] = null;
                    }else if (hp == 4) {
                        hp++;
                        inventory[selected] = null;
                    }
                    break;

                case "meat_rabbit":

                if (hp < 4) {
                    hp += 2;
                    inventory[selected] = null;
                }else if (hp == 4) {
                    hp++;
                    inventory[selected] = null;
                }
                    break;
                case "apple":

                    if (hp < 5) {
                        hp++;
                        inventory[selected] = null;
                    }
                    break;
                
                    case "potion_poison":
                        inventory[selected] = null;
                        hp--;
                        getEffect("speed");
                        break;
            }
        break;

        
        case "1":
            if (parseInt(key) <= inventorySize) {
                selected = 0;
                pl.damage = getLootData(inventory[selected], "damage");
            }
            break;
        case "2":
            if (parseInt(key) <= inventorySize) {
                selected = 1;
                pl.damage = getLootData(inventory[selected], "damage");
            }
            break;
        case "3":
            if (parseInt(key) <= inventorySize) {
                selected = 2;
                pl.damage = getLootData(inventory[selected], "damage");
            }
            break;
        case "4":
            if (parseInt(key) <= inventorySize) {
                selected = 3;
                pl.damage = getLootData(inventory[selected], "damage");                    }
            break;
        
        
    }
});

var shiftPress = false;

document.addEventListener("keydown", event => {
    key = event.key;
    switch (event.key) {
        case "a":
            keys.a = true;
            shiftPress = false;
            break;
        case "s":
            keys.s = true;
            shiftPress = false;
            break;
        case "d":
            keys.d = true;
            shiftPress = false;
            break;
        case "w":
            keys.w = true;
            shiftPress = false;
            break;
        case "ArrowLeft":
            keys.a = true;
            shiftPress = false;
            break;
        case "ArrowDown":
            keys.s = true;
            shiftPress = false;
            break;
        case "ArrowRight":
            keys.d = true;
            shiftPress = false;
            break;
        case "ArrowUp":
            keys.w = true;
            shiftPress = false;
            break;
            case "A":
                keys.a = true;
                shiftPress = true;
                break;
            case "S":
                keys.s = true;
                shiftPress = true;
                break;
            case "D":
                keys.d = true;
                shiftPress = true;
                break;
            case "W":
                keys.w = true;
                shiftPress = true;
                break;
            case "shift":
                shiftPress = true;
                break;
            case "m":
                if (minimap) {
                    minimap = false;
                }else {
                    minimap = true;
                }
    }
});

document.addEventListener("keyup", event => {
    switch (event.key) {
        case "a":
            keys.a = false;
            shiftPress = false;
            break;
        case "s":
            keys.s = false;
            shiftPress = false;
            break;
        case "d":
            keys.d = false;
            shiftPress = false;
            break;
        case "w":
            keys.w = false;
            shiftPress = false;
            break;
        case "ArrowLeft":
            keys.a = false;
            shiftPress = false;
            break;
        case "ArrowDown":
            keys.s = false;
            shiftPress = false;
            break;
        case "ArrowRight":
            keys.d = false;
            shiftPress = false;
            break;
        case "ArrowUp":
            keys.w = false;
            shiftPress = false;
            break;
            case "A":
                keys.a = false;
                shiftPress = false;
                break;
            case "S":
                keys.s = false;
                shiftPress = false;
                break;
            case "D":
                keys.d = false;
                shiftPress = false;
                break;
            case "W":
                keys.w = false;
                shiftPress = false;
                break;
            case "shift":
                shiftPress = false;
                break;
    }
});

document.addEventListener('mousemove', cursorUpdate);

function cursorUpdate(e) {
    cursorPos.x = e.clientX*2;
    cursorPos.y = e.clientY*2;
    cursorPos.X = Math.floor(cursorPos.x/blockSize);
    cursorPos.Y = Math.floor(cursorPos.y/blockSize);
}

var rightClick = false;

document.onmousedown = click
               
function click(event) {
                if (event.button == 2) {
                    rightClick = true;
                }else {
                    rightClick = false;
                }
}

document.addEventListener('mousedown', mdown);

var mousePressed = false;
var realPress = true;
function mdown() {
    if (realPress) {
        mousePressed = true;
    }
}

function getEffect(effect) {
    switch (effect) {
        case "speed":
            speed = 0.25;
            setInterval(removeEffect("speed"), 6000);
            break;
    }
}

function removeEffect(effect) {
    switch (effect) {
        case "speed":
            console.log("ldsakm");
            while (Math.floor(pos.x*1000)/1000)
            break;
    }
}