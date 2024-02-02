const loadingImage = document.querySelector(".loading");
const ia = document.querySelector(".ia");
const iaNeutral = document.querySelector(".ia-neutral");
const iaTalking = document.querySelector(".ia-talking");

setTimeout(() => {
  loadingImage.style.display = "none";
  ia.style.display = "flex";
  iaNeutral.style.display = "flex";

  setTimeout(function () {
    redirectToNextPage();
  }, 3000);
}, 3000);

function redirectToNextPage() {
  window.location.href = "step4.html";
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});
