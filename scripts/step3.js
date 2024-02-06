const loadingIa = document.querySelector(".loading-ia");

function launchVideo() {
  loadingIa.play();
}

loadingIa.addEventListener("ended", () => {
  redirectToNextPage();
});

function redirectToNextPage() {
  window.location.href = "step4.html";
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});
