const constraints = {
    video: {
        width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
        },
        height: {
            min: 720,
            ideal: 1080,
            max: 1440
        },
        facingMode:{
            exact: 'environment'
        }
    }
};

async function getPhoneWebCum(){
    try
    {
        let videoSrc = await navigator.mediaDevices.getUserMedia(constraints);
        let video = document.getElementById("video");
        video.srcObject = videoSrc;
    }
    catch (e)
    {
        console.log(e);
    }
}

let input = document.getElementById('input__file');
input.addEventListener('change', function(evt){
    let tgt = evt.target || window.event.srcElement, files = tgt.files;
    if (FileReader && files && files.length) {
        let frame = new FileReader();
        frame.onload = function () {
            document.getElementById('image').src = frame.result;
        }
        frame.readAsDataURL(files[0]);
    }

    let inputBlock = document.getElementById('input_block');
    let image = document.getElementById('image');
    image.style.display = "block";
    inputBlock.style.display = "none";

   getPhoneWebCum();
});

