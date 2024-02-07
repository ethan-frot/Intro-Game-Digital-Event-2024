import vocalQuestionAssistant from "../scripts/libs/elevenlabs.js"

setTimeout(async () => {
  await vocalQuestionAssistant("Bonjour, veuillez sourire pour commencer")
}, 1000);

const video = document.getElementById("video");
const canvasContainer = document.getElementById("canvasContainer");

let descriptionUser = { age: 0, gender: "" };
let ageHistory = [];
let faceDetectActive = true;
let intervalState = null;
let faceScanerActive = false;
let scanning = false;

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

    if (expressions) {
      const highestValueKey = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );

      if (highestValueKey === "happy" && faceScanerActive === false && scanning === false) {
        startUserScan();
        scanning = true
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

        descriptionUser = {
          age: Math.floor(averageAge),
          gender: currentGender,
        };

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
        age: "18",
        gender: "homme",
      };
      ageHistory = [];
      currentWindowStartTime = new Date().getTime();
    }
  }, 100);

  intervalState = interval;
}

video.addEventListener("play", handlePlay);

async function startUserScan() {
  await vocalQuestionAssistant("Scane en cours veillez patienter")

  faceScanerActive = true;

  const scanBar = document.querySelector(".scan-bar");
  scanBar.classList.add("active");

  startDescriptionBeforeRedirect();
}

async function startDescriptionBeforeRedirect() {
  const { age, gender } = descriptionUser;
  console.log("age : ", age);

  let msg = `Bonjour ${
    gender === "male" ? "commandant" : "commandante"
  }, nous sommes en l'an 3450, votre age rééle est de ${
    age + 1426
  } ans, votre age crystalique est de ${age} ans. Nous allons pouvoir commencer`;

  await vocalQuestionAssistant(msg)  

  setTimeout(function () {
    redirectToNextPage();
  }, 20000);
}

function redirectToNextPage() {
  window.location.href = "../html/step2.html";
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});
