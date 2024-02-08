const step7Btn = document.querySelector(".step-7-btn");
const backgroundVideo = document.querySelector(".step-7-background-video");

function pushButton(prediction) {
  backgroundVideo.play();
  if (prediction.label === "closed") {
    if (checkCollision(step7Btn.getBoundingClientRect())) {
      step7Btn.src = "../images/step-7-button-pressed.png";
      setTimeout(() => {
        redirectToNextPage();
      }, 200);
    }
  }
}

function redirectToNextPage() {
  window.location.href = "step8.html";
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight") {
    redirectToNextPage();
  }
});

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    window.location.href = "../index.html";
  }
});
