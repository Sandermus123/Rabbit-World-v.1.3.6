var middlePoint = {x: 0, y: 0};
noise.seed(Math.random());
function createMap(w, h) {

    const midPoint = {
        x: Math.floor(Math.random()*(w*0.33)+(w*0.33)), 
        y: Math.floor(Math.random()*(h*0.33)+(h*0.33))
    };

    for (let i = 0; i < h; i++) {

        mapArr.push(new Array());

        for (let j = 0; j < h; j++) {
            let randno = Math.floor(Math.random() * blocks.length);

            let x1 = j;
            let y1 = i;
            let x2 = midPoint.x;
            let y2 = midPoint.y;
            
            let dist = Math.abs(Math.floor(
                Math.sqrt(
                    Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2)
                )
            ));

            let d = dist/30;
            mapArr[i].push(new Block(j, i, noise.simplex2(j/inc, i/inc)-d));
        }
    }

    middlePoint.x = midPoint.x;
    middlePoint.y = midPoint.y;
}