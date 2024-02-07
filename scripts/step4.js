const btn = document.querySelector(".btn");
const btnImage = document.querySelector(".btn-image");
const oxygen = document.querySelector(".oxygen");
const backgroundVideo = document.querySelector(".step-4-background-video");

function pushButton(prediction) {
  backgroundVideo.play();
  if (prediction.label === "closed") {
    if (checkCollision(btn.getBoundingClientRect())) {
      btnImage.src = "../images/step-4-button-pressed.png";
      oxygen.play();
    }
  } else {
    btnImage.src = "../images/step-4-button.png";
    oxygen.pause();
  }
}

oxygen.addEventListener("ended", function () {
  redirectToNextPage();
});

function redirectToNextPage() {
  window.location.href = "step4-5.html";
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight") {
    window.location.href = "../index.html";
  }
});