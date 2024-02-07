const btn1 = document.querySelector(".step-7-btn1");
const btn2 = document.querySelector(".step-7-btn2");
const btn3 = document.querySelector(".step-7-btn3");
const btn4 = document.querySelector(".step-7-btn4");
const backgroundVideo = document.querySelector(".step-7-background-video");

let activatedButtons = 0;

function pushButton(prediction) {
  backgroundVideo.play();
  if (prediction.label === "closed") {
    if (checkCollision(btn1.getBoundingClientRect())) {
      btn1.src = "../images/step-7-button-pressed.png";
      activatedButtons = 1;
    } else if (
      checkCollision(btn4.getBoundingClientRect()) &&
      activatedButtons == 1
    ) {
      btn4.src = "../images/step-7-button-pressed.png";
      activatedButtons = 2;
    } else if (
      checkCollision(btn2.getBoundingClientRect()) &&
      activatedButtons == 2
    ) {
      btn2.src = "../images/step-7-button-pressed.png";
      activatedButtons = 3;
    } else if (
      checkCollision(btn3.getBoundingClientRect()) &&
      activatedButtons == 3
    ) {
      btn3.src = "../images/step-7-button-pressed.png";

      setTimeout(() => {
        redirectToNextPage();
      }, 3000);
    }
  } else {
    btn1.src = "../images/step-7-button.png";
    btn2.src = "../images/step-7-button.png";
    btn3.src = "../images/step-7-button.png";
    btn4.src = "../images/step-7-button.png";
  }
}

function redirectToNextPage() {
  window.location.href = "step8.html";
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight") {
    window.location.href = "../index.html";
  }
});