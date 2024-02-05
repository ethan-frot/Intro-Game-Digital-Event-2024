const text = document.querySelector(".step-8-text");

function startBlinking() {
  let blinkingInterval = setInterval(function () {
    text.style.opacity = text.style.opacity === "0" ? "1" : "0";
  }, 600);

  setTimeout(function () {
    clearInterval(blinkingInterval);
    text.style.opacity = "1";
    redirectToNextPage();
  }, 15000);
}

startBlinking();

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});

function redirectToNextPage() {
  window.location.href = "../index.html";
}
