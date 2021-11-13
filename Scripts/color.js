let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d');


let image = new Image();
image.src = "TestImage/simple_capture.jpg";

main();

canvas.addEventListener('mousedown', function (e) {
	getMouseDown(canvas, context, e);
});

async function main() {
	let plan = await loadImage("TestImage/simple_capture.jpg");
	context.clearRect(0, 0, canvas.width, canvas.height);

	canvas.height = plan.height;
	canvas.width = plan.width;

	context.drawImage(plan, 0, 0, canvas.width, canvas.height);
	let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	let scannedData = imageData.data;

 	for(let i = 0; i < scannedData.length; i+=4){

        let red = scannedData[i];
        let green = scannedData[i + 1];
        let blue = scannedData[i + 2];
        let alpha = scannedData[i + 3]; 

        if(red === 255 && green === 255 && blue === 255){
            alpha = 0;
            scannedData[i + 3] = alpha;
        }

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
	});
}


function getMouseDown(canvas, context, event){
	let rect = canvas.getBoundingClientRect();
	let x = event.clientX - rect.left;
	let y = event.clientY - rect.top;

	let data = context.getImageData(x, y, 1, 1);
	console.log("x: " + x + " y: " + y);
	console.log(data.data[0], data.data[1], data.data[2]);
}