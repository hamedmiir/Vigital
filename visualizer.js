let song;
let mic;
let fft;
let usingMic = false;
let batteryLevel = 1;

/**
 * Preload assets if needed (none currently).
 */
function preload() {
  // Nothing to preload initially
}

/**
 * Setup the canvas, audio input, and battery monitoring.
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255); // Use HSB color mode for smoother color transitions
  fft = new p5.FFT();
  mic = new p5.AudioIn();
  mic.start();
  
  setupBatteryMonitoring();
}

/**
 * Adjust the canvas size when the window is resized.
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/**
 * Draw the visualizer, which reacts to the audio input and other environmental factors.
 */
function draw() {  
  background(0); // Clear the previous frame

  // Set the input for FFT analysis
  if (usingMic) {
    fft.setInput(mic);
  } else if (song && song.isPlaying()) {
    fft.setInput(song);
  }

  let spectrum = fft.analyze();

  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    let hue = map(spectrum[i], 0, 255, 0, 255); // Map spectrum value to hue
    let brightness = map(batteryLevel, 0, 1, 100, 255); // Adjust brightness based on battery level
    fill(hue, 255, brightness);
    rect(x, height, width / spectrum.length, h);
  }
}

/**
 * Toggle the playback of the song.
 */
function togglePlay() {
  if (song && song.isPlaying()) {
    song.pause();
  } else if (song) {
    song.loop();
    usingMic = false;
  }
}

/**
 * Use the microphone as the audio input.
 */
function useMicrophone() {
  if (song) {
    song.stop();
  }
  usingMic = true;
}

/**
 * Load an audio file from the user's input.
 */
function loadFile(event) {
  let file = event.target.files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      song = loadSound(e.target.result, () => {
        song.play();
        usingMic = false;
      });
    };
    reader.readAsDataURL(file);
  }
}

/**
 * Monitor the battery level and update the visuals accordingly.
 */
function setupBatteryMonitoring() {
  navigator.getBattery().then(function(battery) {
    batteryLevel = battery.level;
    battery.addEventListener('levelchange', () => {
      batteryLevel = battery.level;
    });
  });
}
