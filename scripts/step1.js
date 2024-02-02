function vocalResponse(responseText) {
  var msg = new SpeechSynthesisUtterance();
  msg.text = responseText;
  msg.lang = "fr-FR";
  window.speechSynthesis.speak(msg);
}
setTimeout(function () {
  vocalResponse("Bonjour, veuillez sourire pour commencer");
}, 1000);

const video = document.getElementById("video");
const canvasContainer = document.getElementById("canvasContainer");

let descriptionUser = { age: 0, gender: "" };
let ageHistory = [];
let faceDetectActive = true;
let intervalState = null;
let faceScanerActive = false;

const MODEL_PATH = "../assets/face-api/models";

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_PATH),
  faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_PATH),
  faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_PATH),
  faceapi.nets.faceExpressionNet.loadFromUri(MODEL_PATH),
  faceapi.nets.ageGenderNet.loadFromUri(MODEL_PATH),
]).then(startVideo);

async function startVideo() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });

    if ("srcObject" in video) {
      video.srcObject = stream;
    } else {
      video.src = window.URL.createObjectURL(stream);
    }

    video.onloadedmetadata = () => {
      video.play();
    };
  } catch (err) {
    console.error("Error accessing webcam:", err);
  }
}

function handlePlay() {
  if (!faceDetectActive) return;

  const canvas = document.createElement("canvas");
  canvas.width = video.width; // Set the width attribute
  canvas.height = video.height; // Set the height attribute
  canvasContainer.appendChild(canvas);

  const displaySize = { width: video.width, height: video.height };

  const captureDuration = 3000;
  let startTime = new Date().getTime();
  let currentWindowStartTime = startTime;

  const interval = setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();

    const expressions = detections[0]?.expressions;

    if(expressions){
      const highestValueKey = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );
    
      if (highestValueKey === "happy" && faceScanerActive === false) {
        console.log("happy");
        startUserScan();
      }
    }

    if (detections && detections.length > 0) {
      const currentAge = Math.floor(detections[0].age);
      const currentGender = detections[0].gender;

      ageHistory.push(currentAge);

      const currentTime = new Date().getTime();

      if (currentTime - currentWindowStartTime >= captureDuration) {
        const averageAge =
          ageHistory.length > 0
            ? ageHistory.reduce((sum, age) => sum + age, 0) / ageHistory.length
            : currentAge;

        descriptionUser = { age: Math.floor(averageAge), gender: currentGender };

        ageHistory = [];
        currentWindowStartTime = currentTime;
      }

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    } else {
      descriptionUser = {
        age: "Attente de détection...",
        gender: "Attente de détection...",
      };
      ageHistory = [];
      currentWindowStartTime = new Date().getTime();
    }
  }, 100);

  intervalState = interval;
}

video.addEventListener("play", handlePlay);

function startUserScan() {
  var msg = new SpeechSynthesisUtterance();
  msg.text = "Scane en cours, veuillez patienter";
  msg.lang = "fr-FR";
  window.speechSynthesis.speak(msg);
  faceScanerActive = true;

  const scanBar = document.querySelector('.scan-bar');
  scanBar.classList.add('active'); 

  setTimeout(function () {
    startDescriptionBeforeRedirect()
  }, 5000)
}

function startDescriptionBeforeRedirect(){
  var msg = new SpeechSynthesisUtterance();
  const { age, gender } = descriptionUser;
  console.log("age : ", age);
  
  msg.text = `Bonjour ${gender === "male" ? "commandant" : "commandante"}, nous sommes en l'an 3450, votre age rééle est de ${age + 1426 } ans, votre age crystalique est de ${age} ans. Nous allons pouvoir commencer`;
  msg.lang = "fr-FR";
  window.speechSynthesis.speak(msg);
  faceScanerActive = true;

  // redirect to step2.html
  setTimeout(function () {
    window.location.href = "../html/step2.html";
  }, 15000)
}