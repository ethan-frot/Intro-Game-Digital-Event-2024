document.addEventListener("click", () => {
  talkingIa("step-6-alert.mp3");
});

function talkingIa(file) {
  return new Promise((resolve) => {
    let angryIa = new Audio(`../assets/sounds/${file}`);
    angryIa.onended = function () {
      setTimeout(() => {
        openDoor("step-6-open-door.mp3");
        resolve();
      }, 500);
    };
    angryIa.play();
  });
}

function openDoor(file) {
  return new Promise((resolve) => {
    let angryIa = new Audio(`../assets/sounds/${file}`);
    angryIa.onended = function () {
      redirectToNextPage();
      resolve();
    };
    angryIa.play();
  });
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});

function redirectToNextPage() {
  window.location.href = "step7.html";
}
