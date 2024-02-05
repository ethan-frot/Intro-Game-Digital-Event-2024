const video = document.querySelector("#myvideo");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const cursor = document.querySelector(".cursor");
const btn1 = document.querySelector(".step-7-btn1");
const btn2 = document.querySelector(".step-7-btn2");
const btn3 = document.querySelector(".step-7-btn3");
const btn4 = document.querySelector(".step-7-btn4");

let activatedButtons = 0;
let isVideo = false;
let model = null;

const modelParams = {
  flipHorizontal: true,
  maxNumBoxes: 20,
  iouThreshold: 0.5,
  scoreThreshold: 0.6,
};

function startVideo() {
  handTrack.startVideo(video).then(() => {
    runDetection();
  });
}

startVideo();

function runDetection() {
  model.detect(video).then((predictions) => {
    model.renderPredictions(predictions, canvas, context, video);

    predictions.forEach((prediction) => {
      if (prediction.label !== "face") {
        const [x, y, width, height] = prediction.bbox;
        moveCursor(prediction.bbox, cursor);
        closeHand(prediction);
      }
    });
    requestAnimationFrame(runDetection);
  });
}

function moveCursor(handBbox, cursor) {
  // Récupère les dimensions du canvas et de la page web
  const canvasWidth = canvas.offsetWidth;
  const canvasHeight = canvas.offsetHeight;
  const pageWidth = window.innerWidth;
  const pageHeight = window.innerHeight;

  // Calcule la position relative de la main dans le canvas
  const [x, y, width, height] = handBbox;
  const relativeX = (x + width / 2) / canvasWidth;
  const relativeY = (y + height / 2) / canvasHeight;

  // Adapte la position relative aux dimensions de la page web
  const cursorX = relativeX * pageWidth;
  const cursorY = relativeY * pageHeight;

  // Positionne le curseur sur la page
  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;
}

// Load the model.
handTrack.load(modelParams).then((lmodel) => {
  // Detect objects in the image.
  model = lmodel;
});

function checkCollision(block) {
  const cursorRect = cursor.getBoundingClientRect();
  if (
    cursorRect.left < block.right &&
    cursorRect.right > block.left &&
    cursorRect.top < block.bottom &&
    cursorRect.bottom > block.top
  ) {
    return block;
  }
}

function closeHand(prediction) {
  if (prediction.label === "closed") {
    cursor.style.backgroundImage = "url('/images/closed-cursor.png')";
    if (checkCollision(btn1.getBoundingClientRect())) {
      btn1.src = "../images/step-7-button-active.png";
      activatedButtons = 1;
      console.log(activatedButtons);
    } else if (
      checkCollision(btn4.getBoundingClientRect()) &&
      activatedButtons == 1
    ) {
      btn4.src = "../images/step-7-button-active.png";
      activatedButtons = 2;
    } else if (
      checkCollision(btn2.getBoundingClientRect()) &&
      activatedButtons == 2
    ) {
      btn2.src = "../images/step-7-button-active.png";
      activatedButtons = 3;
    } else if (
      checkCollision(btn3.getBoundingClientRect()) &&
      activatedButtons == 3
    ) {
      btn3.src = "../images/step-7-button-active.png";

      setTimeout(() => {
        redirectToNextPage();
      }, 3000);
    } else {
      cursor.style.backgroundImage = "url('/images/open-cursor.png')";
    }
  }
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});

function redirectToNextPage() {
  window.location.href = "step8.html";
}
