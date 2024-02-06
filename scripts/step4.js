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
  setTimeout(function () {
    redirectToNextPage();
  }, 1000);
});

function redirectToNextPage() {
  window.location.href = "step5.html";
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});
