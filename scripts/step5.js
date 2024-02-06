const video = document.querySelector("#step5_video");
const canvas = document.querySelector("#step5_canvasbox");
const context = canvas.getContext("2d");
const sliders = document.querySelectorAll(".step5_range");
const cursor = document.querySelector(".cursor");
const sliderContainer = document.querySelectorAll(".slider-container");
const inputDisabled = document.querySelector("#input-disabled");
const timer = document.querySelector(".timer");
const timerInterval = setInterval(updateTimer, 1000);
let trackButton = document.querySelector("#trackbutton");

let time = 30;

let model = null;
let isOpen = false;

sliderContainer.forEach((slider) => {
  const step5Range = slider.querySelector(".step5_range");
  const step5RangeControl = slider.querySelector(".step5_range_control");
  step5RangeControl.addEventListener("input", (e) => {
    step5Range.value = e.target.value;
  });
});

const modelParams = {
  flipHorizontal: true,
  maxNumBoxes: 20,
  iouThreshold: 0.5,
  scoreThreshold: 0.6,
};

function startVideo() {
  handTrack.startVideo(video).then(function (status) {
    if (status) {
      runDetection();
    } else {
    }
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
        activeButtons(prediction);
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
  model = lmodel;
});

function checkCollision(block) {
  const cursorRect = cursor.getBoundingClientRect();
  const blockRect = block.getBoundingClientRect();
  if (
    cursorRect.left < blockRect.right &&
    cursorRect.right > blockRect.left &&
    cursorRect.top < blockRect.bottom &&
    cursorRect.bottom > blockRect.top
  ) {
    return block;
  }
}

function activeButtons(prediction) {
  sliders.forEach((slider) => {
    if (prediction.label === "closed") {
      cursor.style.backgroundImage = "url('/images/closed-cursor.png')";
      if (checkCollision(slider)) {
        // Récupérer les tailles du slider
        const slideSize = slider.getBoundingClientRect();

        // Récupérer l'espacement entre le bas du slider et le bas de la page
        const sliderBottomRelativeToDoc = window.scrollY + slideSize.bottom;
        const totalDocHeight = document.documentElement.scrollHeight;
        const sliderBottomDistance = totalDocHeight - sliderBottomRelativeToDoc;

        // Hauteur du slider
        const sliderHeight = slideSize.height;
        slider.value = ((sliderBottomDistance - prediction.bbox[1]) / (sliderHeight / 100)) * 2.1;
      }
    }
  });
}

function updateTimer() {
  timer.innerText = time;

  if (time === 0) {
    clearInterval(timerInterval);
    redirectToNextPage();
  } else {
    time--;
  }
}

function redirectToNextPage() {
  window.location.href = "step6.html";
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});
