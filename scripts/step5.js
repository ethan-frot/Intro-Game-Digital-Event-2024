const video = document.querySelector("#step5_video");
const canvas = document.querySelector("#step5_canvasbox");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
const sliders = document.querySelectorAll('.step5_range');
const cursor = document.querySelector("#cursor");
const sliderContainer = document.querySelectorAll(".slider-container");

let model = null;
let isOpen = false;

sliderContainer.forEach(slider => {
  const step5Range = slider.querySelector('.step5_range');
  const step5RangeControl = slider.querySelector('.step5_range_control');
  step5RangeControl.addEventListener("input", (e) => {
    step5Range.value = e.target.value;
  });
});

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.6, // confidence threshold for predictions.
};

function startVideo() {
  handTrack.startVideo(video).then(function (status) {
    if (status) {
      runDetection();
    } else {
    }
  });
}

// startVideo();

function runDetection() {
  model.detect(video).then((predictions) => {
    // console.log("Predictions: ", predictions);
    model.renderPredictions(predictions, canvas, context, video);

    predictions.forEach((prediction) => {
      if (prediction.label !== "face") {
        // Assurez-vous que la classe 'hand' est correcte
        // console.log(prediction);
        const [x, y, width, height] = prediction.bbox;
        // console.log(
        //   `Main détectée à x: ${x}, y: ${y}, largeur: ${width}, hauteur: ${height}`
        // );

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
  // detect objects in the image.
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
  ) {return block}
}

function activeButtons(prediction) {
  sliders.forEach(slider => {
    if (prediction.label === "closed" || prediction.label === "pinch") {
      if (checkCollision(slider)) {
        // récupérer les tailles du slider
        const slideSize = slider.getBoundingClientRect();
        // récupérer l'espacement entre le bas du slider et le bas de la page
        const sliderBottomRelativeToDoc = window.scrollY + slideSize.bottom;
        const totalDocHeight = document.documentElement.scrollHeight;
        const sliderBottomDistance = totalDocHeight - sliderBottomRelativeToDoc;
        // hauteur du slider
        const sliderHeight = slideSize.height;
        slider.value = ((sliderBottomDistance - prediction.bbox[1]) / (sliderHeight / 100)) * 2.1;
      }
    }
  });
}