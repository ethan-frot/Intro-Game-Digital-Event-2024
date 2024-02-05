const pseudoField = document.querySelector(".step2-pseudo-field");

document.addEventListener("click", function () {
  initGame();
});

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
  return new Promise((resolve, reject) => {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "fr-FR";
    let response = "";

    recognition.onresult = function (event) {
      let responseEvent = event.results[0][0].transcript;
      responseEvent.toLowerCase();
      response = responseEvent
      resolve(response);
    };
    setTimeout(() => {
      recognition.onspeechend = function (event) {
        if(response === ""){
          reject()
        }
      };
    }, 1000);
    recognition.start();
  });
}

async function initGame() {
  pseudoField.textContent = "_______";
  // demander pseudo
  await vocalQuestionAssistant("step2_identity.mp3");
  // écouter pseudo user
  try {
    const pseudoAsk = await vocalResponseRecordUser();
    pseudoField.textContent = pseudoAsk;
    // confirmation pseudo
    await vocalQuestionAssistant("step2_confirmation.mp3");
    // écouter confirmation
    const confirmAsk = await vocalResponseRecordUser();
    if (confirmAsk.includes("oui") || confirmAsk.includes("ouais") || confirmAsk.includes("ouaip")) {
      const pseudo = pseudoAsk;
      setTimeout(function () {
        redirectToNextPage();
      }, 1500);
    } else {
      initGame();
    }
  } catch (error) {
    console.log("veuillez répondre !")
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
