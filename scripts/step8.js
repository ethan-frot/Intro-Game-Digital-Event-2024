const end = document.querySelector(".end");

function launchVideo() {
  end.play();
}

setTimeout(function () {
  redirectToNextPage();
}, 15000);

function redirectToNextPage() {
  window.location.href = "../index.html";
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
