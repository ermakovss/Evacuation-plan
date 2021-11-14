let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d');
let imageLoad = document.getElementById("image");
let container = document.getElementById("container");

let imageRed = [255, 2, 1];

let offsetRed = 0;
let isReverseOffset = false;

let isScanned = false;
let scannedPixelsArray = [];
let greenPixelsArray = [];

let greenLadder = 0;
let greenReverseLadder = 1;
let s = 20;

setInterval(main, 0.00000001);

canvas.addEventListener('mousedown', function (e) {
    getMouseDown(canvas, context, e);
});

async function main(){
    let plan = await loadImage(imageLoad.src);
    context.fillRect(0, 0, canvas.width, canvas.height);

    canvas.height = container.offsetHeight / 2 ;
    canvas.width = container.offsetWidth;

    context.drawImage(plan, 0, 0, container.offsetWidth, container.offsetHeight / 2);
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let scannedData = imageData.data;

    changeWhiteToAlpha(scannedData);

    if(!isScanned){
        getAllRedPixels(scannedData);
        getAllGreenPixels(scannedData);
        isScanned = true;
    }

    if(isScanned){
        changeRedPixels(scannedData);
        changeGreenPixels(scannedData);
    }

    if(offsetRed === 0){
        isReverseOffset = true;
    }

    if(offsetRed < -50){
        isReverseOffset = false;
    }

    if(isReverseOffset){
        offsetRed -= 7;
    }

    if(!isReverseOffset){
        offsetRed += 7;
    }

    imageData.data = scannedData;
    context.putImageData(imageData, 0, 0);
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

function getAllRedPixels(scannedData){
    let counterScanned = 0;
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

            scannedPixelsArray[counterScanned] = i;
            counterScanned++;
        }
    }
}

function changeRedPixels(scannedData){
    for(let i = 0; i < scannedPixelsArray.length; i++){
        scannedData[scannedPixelsArray[i]] += offsetRed;
    }
}

function changeWhiteToAlpha(scannedData){
    let maxWhiteCode = [255, 255, 255];
    let minWhiteCode = [160, 160, 150];

    for(let i = 0; i < scannedData.length; i+=4){

        let red = scannedData[i];
        let green = scannedData[i + 1];
        let blue = scannedData[i + 2];
        let alpha = scannedData[i + 3]; 

        if(red <= maxWhiteCode[0] && red >= minWhiteCode[0] &&
           green <= maxWhiteCode[1] && green >= minWhiteCode[1] && 
           blue <= maxWhiteCode[2] && blue >= minWhiteCode[2]){
            
            alpha = 0;
            scannedData[i + 3] = alpha;
        }
    }
}

function getAllGreenPixels(scannedData){
    let minGreenCode = [0, 50, 0];
    let maxGreenCode = [105, 255, 137];

    let counterScanned = 0;
    for(let i = 0; i < scannedData.length; i+=4){

        let red = scannedData[i];
        let green = scannedData[i + 1];
        let blue = scannedData[i + 2];

        if(red >= minGreenCode[0] && red <= maxGreenCode[0] &&
            green >=  minGreenCode[1] && green <= maxGreenCode[1] &&
            blue >= minGreenCode[2] && blue <= maxGreenCode[2]){

            if(red >= 50 && red <= 115 &&
                green >= 50 && green <= 115 &&
                blue >= 46 && blue <= 110){

                continue;
            }

            greenPixelsArray[counterScanned] = i;
            counterScanned++;
        }
    }

}

async function changeGreenPixels(scannedData){   
    if(greenLadder < greenPixelsArray.length){

        for(let i = 0; i <= greenLadder; i++){

            scannedData[greenPixelsArray[i]] = 50;
            scannedData[greenPixelsArray[i] + 1] = 125;
            scannedData[greenPixelsArray[i] + 2] = 50;
        }

        greenLadder += 50;
    }

    if(greenLadder >= greenPixelsArray.length) greenLadder = 0;
}

function getMouseDown(canvas, context, event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    let data = context.getImageData(x, y, 1, 1);
    console.log("x: " + x + " y: " + y);
    console.log(data.data[0], data.data[1], data.data[2], data.data[3]);
}
