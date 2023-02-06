const webcam = document.querySelector(".webcam");

const videoCanvas = document.querySelector(".video");
const videoCanvasCtx = videoCanvas.getContext('2d');

const faceCanvas = document.querySelector(".face");
const faceCanvasCtx = faceCanvas.getContext('2d');

const faceDetector = new FaceDetector();


async function populate(){
    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            width: 1280,
            height: 720
        }
    });
    videoCanvas.width = 1280;
    videoCanvas.height = 720;
    faceCanvas.width = 1280;
    faceCanvas.height = 720;

    webcam.srcObject = stream;
    await webcam.play();
}

function censor(boundingBox){
    videoCanvasCtx.imageSmoothingEnabled = false;

    videoCanvasCtx.clearRect(0, 0, videoCanvas.width, videoCanvas.height)

    // draw the small face
    videoCanvasCtx.drawImage(
        // 5 source args
        webcam, // where does the source come from?
        boundingBox.x, // where do we start the source pull from?
        boundingBox.y,
        boundingBox.width,
        boundingBox.height,
        // 4 draw args
        boundingBox.x, // where should we start drawing the x and y?
        boundingBox.y,
        10,
        10
    )
    // take that face back out and draw it back normal size
    // draw the small face back on, but scaled up
    const width = boundingBox.width;
    const height = boundingBox.height;
    videoCanvasCtx.drawImage(
        videoCanvas, // source
        boundingBox.x, // where do we start the source pull from?
        boundingBox.y,
        10,
        10,
        //drawing args
        boundingBox.x,
        boundingBox.y,
        width,
        height
    );
}

function draw(boundingBox){
    const {left, top, width, height} = boundingBox;
    videoCanvasCtx.lineWidth = 2;
    videoCanvasCtx.strokeStyle = '#ffc600';

    videoCanvasCtx.clearRect(0,0,videoCanvas.width, videoCanvas.height);
    censor(boundingBox);
    videoCanvasCtx.strokeRect(left, top, width, height);
}

async function detect(){
    const faces = await faceDetector.detect(webcam);
    faces.forEach(draw);
    requestAnimationFrame(detect);
}

populate().then(detect);