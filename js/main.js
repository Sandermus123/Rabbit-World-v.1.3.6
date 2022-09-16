function Main() {
    createMap(mapSize.w, mapSize.h);
    init();
    setInterval(gameLoop, 1/fps*1000);
}