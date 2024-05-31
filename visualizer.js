let song;
let mic;
let fft;
let usingMic = false;
let video;
let batteryLevel = 1;

/**
 * Preload assets if needed (none currently).
 */
function preload() {
  // Nothing to preload initially
}

/**
 * Setup the canvas, audio input, video capture, and battery monitoring.
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();
  mic = new p5.AudioIn();
  mic.start();
  
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();
  
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
  background(0);
  
  // Draw video as background with transparency
  tint(255, 150);
  image(video, 0, 0, width, height);
  
  // Adjust visuals based on battery level
  let batteryColor = color(map(batteryLevel, 0, 1, 0, 255), 0, 255);
  
  if (usingMic) {
    fft.setInput(mic);
  } else if (song && song.isPlaying()) {
    fft.setInput(song);
  }

  let spectrum = fft.analyze();

  noStroke();
  fill(batteryColor);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
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
