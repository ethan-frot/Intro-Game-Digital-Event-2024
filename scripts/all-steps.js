const video = document.querySelector("#myvideo");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const cursor = document.querySelector(".cursor");

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

        // Every steps
        // Step 4 & Step 7 :
        if (
          window.location.href.endsWith("step4.html") ||
          window.location.href.endsWith("step7.html")
        ) {
          pushButton(prediction);
        }
        // Step 5 :
        if (window.location.href.endsWith("step5.html")) {
          activeButtons(prediction);
        }

        // Step 3 & Step 6 :
        if (
          window.location.href.endsWith("step3.html") ||
          window.location.href.endsWith("step6.html") ||
          window.location.href.endsWith("step6.html")
        ) {
          launchVideo();
        }
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
  } else {
    cursor.style.backgroundImage = "url('/images/open-cursor.png')";
  }
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});
