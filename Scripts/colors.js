let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d');
let imageLoad = document.getElementById("image");
let container = document.getElementById("container");

let imageRed = [255, 2, 1];
let imageGreen = [0, 140, 40];

let offsetGreen = 0;
let isReverseOffset = false;

let triangle = document.getElementById("triangle");
let ctx = triangle.getContext('2d');

triangle.height = 50;
triangle.width = 80;
triangle.style.position = 'absolute';

let positionX = [];
let positionY = [];

drawTriangle(5, 5,10, 10);

function drawTriangle(left_padding, top_padding, height, width) {
    ctx.beginPath();
    ctx.moveTo(0 + left_padding, 0 + height + top_padding);
    ctx.lineTo(width / 2 + left_padding, 0 + top_padding);
    ctx.lineTo(width + left_padding, 0 + height + top_padding);
    ctx.fill();
}

function lineTriangle(){
    ctx.beginPath();
    ctx.moveTo(50,25);
    ctx.lineTo(75,50);
    ctx.lineTo(75,0);
    ctx.fill();
}

setInterval(main, 1);

canvas.addEventListener('mousedown', function (e) {
    getMouseDown(canvas, context, e);
});

async function main(){
    let plan = await loadImage(imageLoad.src);
    context.clearRect(0, 0, canvas.width, canvas.height);

     canvas.height = container.offsetWidth;
     canvas.width =   container.offsetHeight / 2;

    context.drawImage(plan, 0, 0, container.offsetWidth, container.offsetHeight / 2);
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let scannedData = imageData.data;

    for(let i = 0; i < scannedData.length; i+=4){
        let red = scannedData[i];
        let green = scannedData[i + 1];
        let blue = scannedData[i + 2];

        let redTolerance = 140;
        let greenTolerance = 82;
        let blueTolerance = 82;

        if(red >= imageRed[0] - redTolerance && red <= imageRed[0] + redTolerance &&
            green >= imageRed[1] - greenTolerance && green <= imageRed[1] + greenTolerance &&
            blue >= imageRed[2] - blueTolerance && blue <= imageRed[2] + blueTolerance) {

            scannedData[i] += offsetGreen;
        }
    }

    if(offsetGreen === 50){
        isReverseOffset = true;
    }

    if(offsetGreen < -80){
        isReverseOffset = false;
    }

    if(isReverseOffset){
        offsetGreen--;
    }

    if(!isReverseOffset){
        offsetGreen++;
    }

    imageData.data = scannedData;
    context.putImageData(imageData, 0, 0);

    //if(positionX.length === 0) greenPosition();
    //if(positionX.length != 0) triangleMove();
    //if(positionX.length === counterMoveX - 1) reverseMove();
}

function loadImage(src){
    return new Promise((resolve) => {
        let image = new Image();
        imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        image.src = src;
        image.onload = () => resolve(image);
        imageLoad.style.display = "none";
    });
}

function greenPosition(){
    let toleranceRedData = 20;
    let toleranceGreenData = 15;
    let toleranceBlueData = 45;

    let counter = 0;
    let previousPositionX = 0;
    let previousPositionY = 0;

    for(let i = 0; i < canvas.width; i++){
        for(let j = 0; j < canvas.height; j++){
            let data = context.getImageData(i, j, 1, 1).data;
            if(data[0] >= imageGreen[0] - toleranceRedData && data[0] <= imageGreen[0] + toleranceRedData &&
                data[1] >= imageGreen[1] - toleranceGreenData && data[1] <= imageGreen[1] + toleranceGreenData &&
                data[2] >= imageGreen[2] - toleranceBlueData && data[2] <= imageGreen[2] + toleranceBlueData) {

                positionX[counter] = i;
                positionY[counter] = j;
                counter++;

                console.log("previous = " + previousPositionX + ", i = " + j);

                previousPositionX = j;
                previousPositionY = i;
            }
        }
    }
}

let counterMoveX = 0;
let counterMoveY = 0;

function triangleMove(){
    triangle.style.display = "block";
    for(counterMoveX; counterMoveX < positionX.length; counterMoveX++){
        for(counterMoveY; counterMoveY < positionY.length; counterMoveY++){
            setParametrs(positionX[counterMoveX], positionY[counterMoveY]);

            counterMoveY++;
            counterMoveX++;
            return;
        }
    }
}

function reverseMove(){
    for(counterMoveX; counterMoveX >= 0; counterMoveX--){
        for(counterMoveY; counterMoveY >= 0; counterMoveY--){
            setParametrs(positionX[counterMoveX], positionY[counterMoveY]);

            counterMoveY--;
            counterMoveX--;
            return;
        }
    }
}

function setParametrs(i, j){
    triangle.style.left = i + 'px';
    triangle.style.top = j + 'px';
}

function getMouseDown(canvas, context, event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let data = context.getImageData(x, y, 1, 1);
    console.log("x: " + x + " y: " + y);
    console.log(data.data[0], data.data[1], data.data[2]);
}






















