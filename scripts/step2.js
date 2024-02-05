const pseudoField = document.querySelector(".step2-pseudo-field");

// setTimeout(() => {
//   initGame();
// }, 1000);

function vocalQuestionAssistant(file) {
  return new Promise((resolve) => {
    let identity = new Audio(`../assets/sounds/${file}`);
    identity.onended = function () {
      resolve();
    };
    identity.play();
  });
}

function vocalResponseRecordUser() {
  return new Promise((resolve) => {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "fr-FR";

    recognition.onresult = function (event) {
      var response = event.results[0][0].transcript;
      response.toLowerCase();
      resolve(response);
    };

    recognition.start();
  });
}

async function initGame() {
  pseudoField.textContent = "_______";
  // demander pseudo
  await vocalQuestionAssistant("step2_identity.mp3");
  // écouter pseudo user
  const pseudoAsk = await vocalResponseRecordUser();
  pseudoField.textContent = pseudoAsk;
  // confirmation pseudo
  await vocalQuestionAssistant("step2_confirmation.mp3");
  // écouter confirmation
  const confirmAsk = await vocalResponseRecordUser();
  if (
    confirmAsk.includes("oui") ||
    confirmAsk.includes("ouais") ||
    confirmAsk.includes("ouaip")
  ) {
    const pseudo = pseudoAsk;
    setTimeout(function () {
      redirectToNextPage();
    }, 15000);
  } else {
    initGame();
  }
}

function redirectToNextPage() {
  window.location.href = "../html/step3.html";
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});
