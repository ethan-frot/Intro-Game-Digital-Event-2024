const loadingIa = document.querySelector(".loading-4-5-ia");

function launchVideo() {
  loadingIa.play();
}

// loadingIa.addEventListener("ended", () => {
//   redirectToNextPage();
// });

function redirectToNextPage() {
  window.location.href = "step5.html";
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});

window.addEventListener('load', (event) => {
  launchVideo()
});