const pseudoField = document.querySelector(".step2-pseudo-field");
const confirmButtons = document.querySelectorAll('.confirm');

setTimeout(() => {
  initGame();
}, 1000);

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
      let responseEvent = event.results[0][0].transcript;
      responseEvent.toLowerCase();
      resolve(responseEvent);
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
  //confirmation pseudo
  await vocalQuestionAssistant("step2_confirmation.mp3");
  confirmButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (button.id == 'oui') {
        const pseudo = pseudoAsk;
        setTimeout(function () {
          redirectToNextPage();
        }, 1000);
      } else if (button.id == 'non') {
        initGame();
      }
    });
  });
}

function redirectToNextPage() {
  window.location.href = "../html/step3.html";
}

window.addEventListener("keydown", function (event) {
  if (event.code === "ArrowDown") {
    redirectToNextPage();
  }
});
