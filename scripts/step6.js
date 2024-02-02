console.log("Wait for the swtich...");
setTimeout(function () {
  redirectToNextPage();
}, 5000);

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});

function redirectToNextPage() {
  window.location.href = "step7.html";
}
