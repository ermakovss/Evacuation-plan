let canvas = document.getElementById("canvas");
let context = canvas.getContext('2d');

let positionX = [];
let positionY = [];

let imageRed = [255, 2, 1];
let imageGreen = [0, 140, 40];

let offsetGreen = 0;
let isReverseOffset = false;

let image = new Image();
image.src = "TestImage/simple_capture.jpg";

setInterval(main, 0.00001);

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
	let data;

	let toleranceRedData = 20;
	let toleranceGreenData = 15;
	let toleranceBlueData = 45;

	let counter = 0;

	for(let i = 0; i < canvas.height; i++){
		for(let j = 0; j < canvas.width; j++){
			data = context.getImageData(j, i, 1, 1).data;
			if(data[0] >= imageGreen[0] - toleranceRedData && data[0] <= imageGreen[0] + toleranceRedData &&
				data[1] >= imageGreen[1] - toleranceGreenData && data[1] <= imageGreen[1] + toleranceGreenData &&
				data[2] >= imageGreen[2] - toleranceBlueData && data[2] <= imageGreen[2] + toleranceBlueData) {

				data[0] = imageRed[0];
				data[1] = imageRed[1];
				data[2] = imageRed[2];
			}
		}
	}

	if (offsetGreen === 0) {
		isReverseOffset = true;
	}

	if (offsetGreen < -80) {
		isReverseOffset = false;
	}

	if (isReverseOffset) {
		offsetGreen--;
	}

	if (!isReverseOffset) {
		offsetGreen++;
	}

	imageData.data = data;
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