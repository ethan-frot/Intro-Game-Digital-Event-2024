const btn1 = document.querySelector(".step-7-btn1");
const btn2 = document.querySelector(".step-7-btn2");
const btn3 = document.querySelector(".step-7-btn3");
const btn4 = document.querySelector(".step-7-btn4");
const backgroundVideo = document.querySelector(".step-7-background-video");
const buttonClick = new Audio("../assets/sounds/step-7-button-click.mp4");

const expectedSequence = [1, 4, 2, 3];
let clickedSequence = [];
let sequenceIndex = 0;

function pushButton(prediction) {
  backgroundVideo.play();
  if (prediction.label === "closed") {
    if (
      checkCollision(btn1.getBoundingClientRect()) &&
      !clickedSequence.includes(1)
    ) {
      clickedSequence.push(1);
      btn1.src = "../images/step-7-button-pressed.png";
      buttonClick.play();
      checkSequence();
    } else if (
      checkCollision(btn4.getBoundingClientRect()) &&
      !clickedSequence.includes(4)
    ) {
      clickedSequence.push(4);
      btn4.src = "../images/step-7-button-pressed.png";
      buttonClick.play();
      checkSequence();
    } else if (
      checkCollision(btn2.getBoundingClientRect()) &&
      !clickedSequence.includes(2)
    ) {
      clickedSequence.push(2);
      btn2.src = "../images/step-7-button-pressed.png";
      buttonClick.play();
      checkSequence();
    } else if (
      checkCollision(btn3.getBoundingClientRect()) &&
      !clickedSequence.includes(3)
    ) {
      clickedSequence.push(3);
      btn3.src = "../images/step-7-button-pressed.png";
      buttonClick.play();
      checkSequence();
    }
  }
}

function checkSequence() {
  if (clickedSequence.length === expectedSequence.length) {
    if (arraysEqual(clickedSequence, expectedSequence)) {
      redirectToNextPage();
    } else {
      resetSequence();
    }
  }
}

function resetSequence() {
  clickedSequence = [];
  sequenceIndex = 0;
  setTimeout(() => {
    btn1.src = "../images/step-7-button.png";
    btn2.src = "../images/step-7-button.png";
    btn3.src = "../images/step-7-button.png";
    btn4.src = "../images/step-7-button.png";
  }, 300);
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function redirectToNextPage() {
  window.location.href = "step8.html";
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight") {
    window.location.href = "../index.html";
  }
});
