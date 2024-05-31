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
 * Setup the canvas, audio input, video capture, and battery monitoring.
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255); // Use HSB color mode
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

  // Adjust visuals based on battery level
  let hueOffset = frameCount % 255; // Change hue over time

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
    l
