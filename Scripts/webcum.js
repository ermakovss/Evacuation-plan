async function getPhoneWebCum(){
    try
    {
        let videoSrc = await navigator.mediaDevices.getUserMedia({video:true});
        let video = document.getElementById("video");
        video.scrObject = videoSrc;
    }
    catch (e)
    {
        console.log(e);
    }
}

getPhoneWebCum();