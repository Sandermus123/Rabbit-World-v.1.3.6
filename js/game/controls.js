var key;
document.addEventListener("keypress", event => {
    key = event.key;
    switch (event.key) {
        case "a" || "ArrowLeft":
            keys.a = true;
            break;
        case "s" || "ArrowDown":
            keys.s = true;
            break;
        case "d" || "ArrowRight":
            keys.d = true;
            break;
        case "w" || "ArrowUp":
            keys.w = true;
            break;
    }
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
        case "1":
            selected = 0;
            pl.damage = getLootData(inventory[selected], "damage");
            break;
        case "2":
            selected = 1;
            pl.damage = getLootData(inventory[selected], "damage");
            break;
        case "3":
            selected = 2;
            pl.damage = getLootData(inventory[selected], "damage");
            break;
    }
});

document.addEventListener("keyup", event => {
    switch (event.key) {
        case "a" || "ArrowLeft":
            keys.a = false;
            break;
        case "s" || "ArrowDown":
            keys.s = false;
            break;
        case "d" || "ArrowRight":
            keys.d = false;
            break;
        case "w" || "ArrowUp":
            keys.w = false;
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

document.addEventListener('mousedown', mdown);

var mousePressed = false;
var realPress = true;
function mdown() {
    if (realPress) {
        mousePressed = true;
    }
}