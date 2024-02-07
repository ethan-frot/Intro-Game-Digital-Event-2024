const sliders = document.querySelectorAll(".step5_range");
const sliderContainer = document.querySelectorAll(".slider-container");
const inputDisabled = document.querySelector("#input-disabled");
const timer = document.querySelector(".timer");
const timerInterval = setInterval(updateTimer, 1000);
const motor = document.querySelector(".motor");
const backgroundVideo = document.querySelector(".step-5-background-video");

const range1 = document.querySelector("#range-1");
const range2 = document.querySelector("#range-2");
const range3 = document.querySelector("#range-3");

let time = 30;

sliderContainer.forEach((slider) => {
  const step5Range = slider.querySelector(".step5_range");
  const step5RangeControl = slider.querySelector(".step5_range_control");
  step5RangeControl.addEventListener("input", (e) => {
    step5Range.value = e.target.value;
  });
});

let isSliderClicked = false;

function activeButtons(prediction) {
  motor.play();
  backgroundVideo.play();
  sliders.forEach((slider) => {
    if (prediction.label === "closed") {
      if (checkCollision(slider.getBoundingClientRect())) {
        // Récupérer les tailles du slider
        const slideSize = slider.getBoundingClientRect();

        // Récupérer l'espacement entre le bas du slider et le bas de la page
        const sliderBottomRelativeToDoc = window.scrollY + slideSize.bottom;
        const totalDocHeight = document.documentElement.scrollHeight;
        const sliderBottomDistance = totalDocHeight - sliderBottomRelativeToDoc;

        // Hauteur du slider
        const sliderHeight = slideSize.height;
        if (slider.id == "range-2" || slider.id == "range-3") {
          slider.value =
            ((sliderBottomDistance - prediction.bbox[1]) /
              (sliderHeight / 100)) *
            2.1;
        }

        // Changement random d'un autre slider
        if (slider.id == "range-1" && isSliderClicked == false) {
          range1.value = getRandomNumber();
          isSliderClicked = true;
        }
      }
    } else if (prediction.label === "open") {
      isSliderClicked = false;
    }
  });
}

function getRandomNumber() {
  const rangeSelector = Math.random() < 0.5 ? 1 : 2;

  let randomNumber;
  if (rangeSelector === 1) {
    randomNumber = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
  } else {
    randomNumber = Math.floor(Math.random() * (90 - 60 + 1)) + 60;
  }
  return randomNumber;
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
  if (event.code === "ArrowRight") {
    window.location.href = "../index.html";
  }
});
