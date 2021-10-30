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

getPhoneWebCum();

