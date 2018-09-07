// Initi speech synthesis API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rateValue");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitchValue");

// Init Voice Array
let voices = [];

const getVoices = () => {
  //   console.log("inside get Voices...");
  voices = synth.getVoices();

  //   console.log(voices);
  // Loop through voices, and create an item for each voice - to be added to Voice Selection list
  voices.forEach(voice => {
    const option = document.createElement("option");

    // Fill option with voice and language
    option.textContent = voice.name + "(" + voice.lang + ")";
    // Set attributes
    option.setAttribute("data-name", voice.name);
    option.setAttribute("data-lang", voice.lang);
    voiceSelect.appendChild(option);
  });
};

getVoices();

if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak function
const speak = () => {
  // When it is speaking, this function should not proceed
  if (synth.speaking) {
    console.error("Already Speaking...");
    return;
  }
  if (textInput.value !== "") {
    // Get Speak Text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    // End of speech
    speakText.onend = e => {
      console.log("Done Speaking...");
    };

    // Speak error
    speakText.onerror = e => {
      console.error("Something went wrong");
    };

    // Selected Voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //Speak
    synth.speak(speakText);
  }
};

// Event Listeners

// Text form submit
textForm.addEventListener("submit", e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate Value change
rate.addEventListener("change", e => (rateValue.textContent = rate.value));

// Pitch Value change
pitch.addEventListener("change", e => (pitchValue.textContent = pitch.value));

// Voice Select change
voiceSelect.addEventListener("change", e => speak());
