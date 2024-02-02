const pseudoField = document.querySelector('.step1-pseudo-field');
initGame()

function vocalQuestionAssistant(responseText){
  return new Promise((resolve) => {
    // Utilisation de l'API Web Speech Synthesis pour lire la réponse
    var msg = new SpeechSynthesisUtterance();
    msg.text = responseText;
    msg.lang = 'fr-FR';
    // Ajout d'un écouteur pour l'événement 'end' qui résoudra la promesse une fois la parole terminée
    msg.onend = function() {
      resolve();
    };
    window.speechSynthesis.speak(msg);
  })
}

function vocalResponseRecordUser() {
  return new Promise((resolve) => {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "fr-FR";
    
    recognition.onresult = function(event) {
      var response = event.results[0][0].transcript;
      response.toLowerCase()
      resolve(response)
    };
    
    recognition.start();
  })
}

async function initGame(){
  pseudoField.textContent = '_______';
  // demander pseudo
  await vocalQuestionAssistant("Veuillez décliner votre idendité");
  // écouter pseudo user
  const pseudoAsk = await vocalResponseRecordUser();
  pseudoField.textContent = pseudoAsk;
  // confirmation pseudo
  await vocalQuestionAssistant("Souhaitez vous confirmer")
  // écouter confirmation
  const confirmAsk = await vocalResponseRecordUser();
  if(confirmAsk.includes('oui') || confirmAsk.includes('ouais') || confirmAsk.includes('ouaip')){
    const pseudo = pseudoAsk;
    // passage étape 2
    setTimeout(function () {
      window.location.href = "../html/step3.html";
    }, 1500)
  } else {
    initGame();
  }
}
