var fps = 20;
var keys = {
    a: false,
    s: false,
    d: false,
    w: false
};

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

var sl = {
    abs(num) {
        if (num < 0) {
            return -num;
        }else {
            return num;
        }
    },
    sign(num) {
        if (num < 0) {
            return -1;
        }else if (num == 0) {
            return 0;
        }else if (num > 0) {
            return 1;
        }
    },
    sqrt(num) {
        return num*num;
    },
    pow(x, y) {
        let num = 1;
        for (let i=0; i<y; i++) {
            num *= x;
        }
        return num;
    },
    pi: 3.141592653589793,
    touches(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x1 < x2 + w2 &&
            x1 + w1 > x2 &&
            y1 < y2 + h2 &&
            y1 + h1 > y2) {
            return true;
        }else {return false;}
    }
}

var blocks = [
    "grass",
    "water"
];

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
var mapSize = {w: 140, h: 140};
var blockSize = 140;
const spriteSheetGridSize = 200;
var mapArr = [];
const screenSize = {w: 100,h: 100};
screenSize.w = Math.floor(window.innerWidth/blockSize);
screenSize.h = Math.floor(window.innerHeight/blockSize);
var pos = {x: 50, y: 50};
var speed = 0.2;
var vel = {x: 0, y: 0};
const inc = Math.floor(Math.random()*20)+70;
canvas.width = screenSize.w*blockSize;
canvas.height = screenSize.h*blockSize;
document.querySelector("body").width = screenSize.w*blockSize;
document.querySelector("body").height = screenSize.h*blockSize;
document.querySelector("html").width = screenSize.w*blockSize;
document.querySelector("html").height = screenSize.h*blockSize;
var seaHeight = -0.4;
var canWalk = true;
var cursorSize = 30;
var cursorPos = {x: 0, y: 0, X: 0, Y: 0};
cursorPos.X = Math.floor(cursorPos.x/blockSize);
cursorPos.Y = Math.floor(cursorPos.y/blockSize);

var time = 12;
var minimap = false;

const startChestAmount = 30;
const startWildlifeAmount = 50;
var loot = [];
var lootTypes = ["potion_poison", "potion_water", "sword_flint", "sword_quartz", "sword_carbon", "apple"];
var chests = [];
var wildlife = [];

var inventorySize = 4;
var inventory = new Array(inventorySize);
var selected = 0;
var inventoryCellSize = 100;
var inventoryTop = canvas.height-inventoryCellSize-15;
var inventoryLeft = 20;

var defaultDamage = 1;

var hp = 5;
var healthBarCellSize = 50;
var healthBarLeft = 22;
var healthBarTop = canvas.height-inventoryCellSize-30-healthBarCellSize;

var wildlifeTypes = ["bear", "rabbit", "sanderling", "frog", "turtle"];

var minimapSize = 50;

function init() {
    for (let i = 0; i < startWildlifeAmount; i++) {
        wildlife.push(new Animal())
    }
    for (let i = 0; i < startChestAmount; i++) {
        chests.push(new Chest())
    }
}