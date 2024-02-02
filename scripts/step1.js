





function startDescriptionBeforeRedirect(){
  var msg = new SpeechSynthesisUtterance();
  const { age, gender } = descriptionUser;
  console.log("age : ", age);
  
  msg.text = `Bonjour ${gender === "male" ? "commandant" : "commandante"}, nous sommes en l'an 3450, votre age rééle est de ${age + 1426 } ans, votre age crystalique est de ${age} ans. Nous allons pouvoir commencer`;
  msg.lang = "fr-FR";
  window.speechSynthesis.speak(msg);
  faceScanerActive = true;

  // redirect to step2.html
  setTimeout(function () {
    window.location.href = "step2.html";
  }, 15000)
}
