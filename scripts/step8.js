const end = document.querySelector(".end");

function launchVideo() {
  end.play();
}

setTimeout(function () {
  redirectToNextPage();
}, 15000);

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});

function redirectToNextPage() {
  window.location.href = "../index.html";
}
