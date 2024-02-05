const loading = document.querySelector(".loading");
const iaTalking = document.querySelector(".ia-talking");

document.addEventListener("click", () => {
  loading.play();
});

loading.addEventListener("ended", () => {
  loading.style.display = "none";
  iaTalking.style.display = "flex";
  talkingIa("step-3-ia-talking.mp3");
  iaTalking.play();
});

function talkingIa(file) {
  return new Promise((resolve) => {
    let talking = new Audio(`../assets/sounds/${file}`);
    talking.onended = function () {
      setTimeout(() => {
        resolve();
        redirectToNextPage();
      }, 500);
    };
    talking.play();
  });
}

function redirectToNextPage() {
  window.location.href = "step4.html";
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});
