const video = document.getElementById("video");
var socket = io("http://localhost:3000");
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
  faceapi.nets.faceExpressionNet.loadFromUri("./models"),
]).then(startVideo);
function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}
video.addEventListener("play", () => {
  // console.log("ssd");
  const displaySize = { width: 720, height: 560 };
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions({ inputSize: 224 })
      )
      .withFaceLandmarks();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    socket.emit('detect', resizedDetections);
    console.log(resizedDetections);
    // console.log(resizedDetections[0].landmarks.positions[31]);
  }, 10);
});
