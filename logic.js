/*jshint esversion: 6 */

let xOffset = xOffsetStart = 0;
let yOffset = yOffsetStart = 0;
let xInc = yInc = 1;
let s = 8;
let w, h;

let colors = new Array(20);

let values;

function setup(){
    var canvas = createCanvas(window.innerWidth*.9, window.innerHeight*.9);
    w = floor(width/s);
    h = floor(height/s);
    canvas.resize(w*s, h*s);
    background(0);
    colors.fill("");
    colors = colors.map((color, index) => color += randomColor())
    for(let i = colors.length-1; i >= 0; i--){
        colors.splice(i,0,oppositeColor(colors[i]));
    }

    values = new Array(h).fill().map(row => new Array(w).fill().map((val) =>val = {
        color: 0,
        x:0,
        y:0
    }));

    values.forEach((row, y) => row.forEach((value, x) => {
        value.y = y*s;
        value.x = x*s;
        fill(colors[value.color++]);
        rect(value.x, value.y, s, s);
    }));
}

function draw(){
    for(let i = 0; i < 100; i++){
        iterateSquare();
    }
}

function iterateSquare(){
    let currentRect = values[yOffset][xOffset];
    fill(colors[currentRect.color]);
    rect(currentRect.x, currentRect.y, s, s);
    currentRect.color = (currentRect.color+1)%colors.length;

    xOffset += xInc;
    yOffset += yInc;

    if(xOffset == 0 || xOffset == w-1) xInc *= -1;
    if(yOffset == 0 || yOffset == h-1) yInc *= -1;
}

function randomColor(){
    const chars = '0123456789ABCDEF';
    let color = "#";
    for(let i = 0; i < 6; i++)
        color += chars[floor(random(chars.length))];
    return color;
}

function oppositeColor(color){
    const chars = '0123456789ABCDEF';
    return color.split('').map(char => char = (char != "#")? chars[chars.length-chars.indexOf(char)-1]: "#").join('');
}
