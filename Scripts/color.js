/*window.onload = function(){
	let colorBlack = [0, 0, 0, "Black"];
	let colorGreen = [0, 130, 50, "Green"];

	let image = new Image();
	let canvas = document.createElement("canvas");
	let context;

	image.onload = function (){
		canvas.width = image.width;
		canvas.height = image.height * 2;

		context = canvas.getContext("2d");
		document.body.appendChild(canvas);

		context.drawImage(image, 0, 0, image.width, image.height);

		FindColorBlack(image, colorBlack,context);
		FindColorGreen(image, colorGreen,context);
	}

	//image.src = "https://energoznak.ru/wp-content/uploads/2018/02/web-catalog3.jpg";
	image.src = "TestImage/simple_capture.jpg";
	//image.style.display = 'none';

	canvas.addEventListener('mousedown', function (e){
		getMouseDown(canvas, context, e);
	});
}*/


/*function FindColor(image, color, tolerance, context){
	for(let x = 0; x < image.width; x++){
		for(let y = 0; y < image.height; y++){
			let pixelData = context.getImageData(x, y, 1, 1);
			if(pixelData.data[0] <= color[0] + tolerance &&
			   pixelData.data[1] <= color[1] + tolerance &&
			   pixelData.data[2] <= color[2] + tolerance){
				context.fillStyle = color[3];
				context.fillRect(x, y + image.height, 1, 1);
			}
		}
	}
}*/

/*function FindColorBlack(image, color, context){
	let tolerance = 5;
	for(let x = 0; x < image.width; x++) {
		for (let y = 0; y < image.height; y++) {
			let pixelData = context.getImageData(x, y, 1, 1);
			if(pixelData.data[0] <= color[0] + tolerance &&
				pixelData.data[1] <= color[1] + tolerance &&
				pixelData.data[2] <= color[2] + tolerance){
				context.fillStyle = color[3];
				context.fillRect(x, y + image.height, 1, 1);
			}
		}
	}
}

function FindColorGreen(image, color, context){
	let tolerance = 50;
	for(let x = 0; x < image.width; x++) {
		for (let y = 0; y < image.height; y++) {
			let pixelData = context.getImageData(x, y, 1, 1);
			if(pixelData.data[0] >= color[0] &&  color[0] + tolerance >= pixelData.data[0] &&
				pixelData.data[1] >= color[1] && color[1] + tolerance >= pixelData.data[1] &&
				pixelData.data[2] >= color[2] && color[2] + tolerance >= pixelData.data[2]){
				context.fillStyle = color[3];
				context.fillRect(x, y + image.height, 1, 1);
			}
		}
	}
}
*/


window.onload = function (){
	let canvas = document.createElement("canvas");
	let context = canvas.getContext('2d');;

	let image = new Image();
	image.onload = function (){
		canvas.width = image.width;
		canvas.height = image.height * 2;
		document.body.appendChild(canvas);

		context.drawImage(this, 0, 0);
		let imageData = context.getImageData(0,0, canvas.width, canvas.height);

		let red, green, blue;
		let transparency = [255, 255, 255, 255];

		let imageLightGreen = [5, 130, 60];
		let imageBlackGreen = [150, 215, 180];
		let imageWhiteGreen = [210, 220, 220];
		let imageWhiteGreenBlack = [80, 130, 110];
		let imageSuperWhiteGreen = [80, 180, 100];

		let toleranceGreen = 54;

		for (let i = 0; i < imageData.data.length; i += 4) {
			changeTheColor(imageData, imageLightGreen, toleranceGreen, transparency, i);
			changeTheColor(imageData, imageBlackGreen, toleranceGreen, transparency, i);
			changeTheColor(imageData, imageWhiteGreen, toleranceGreen, transparency, i);
			changeTheColor(imageData, imageWhiteGreenBlack, toleranceGreen, transparency, i);
			changeTheColor(imageData, imageSuperWhiteGreen, toleranceGreen, transparency, i);
		}

		context.clearRect(0, 0, canvas.width, canvas.height);
		context.putImageData(imageData, 0,0);
	};

	image.setAttribute('src', "TestImage/simple_capture.jpg");

	canvas.addEventListener('mousedown', function (e){
		getMouseDown(canvas, context, e);
	});
}

function changeTheColor(imageData, color, tolerance, newColor, index){
	let red = imageData.data[index];
	let green = imageData.data[index + 1];
	let blue = imageData.data[index + 2];

	if(red >= color[0] - tolerance && red <= color[0] + tolerance &&
		green >= color[1] - tolerance && green <= color[1] + tolerance &&
		blue >= color[2] - tolerance && blue <= color[2] + tolerance){

		imageData.data[index] = newColor[0];
		imageData.data[index + 1] = newColor[1];
		imageData.data[index + 2] = newColor[2];
	}
}

function getMouseDown(canvas, context, event){
	let rect = canvas.getBoundingClientRect();
	let x = event.clientX - rect.left;
	let y = event.clientY - rect.top;

	let data = context.getImageData(x, y, 1, 1);
	console.log("x: " + x + " y: " + y);
	console.log(data.data[0], data.data[1], data.data[2]);
}