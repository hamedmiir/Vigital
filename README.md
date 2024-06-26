
# Real-time Environmental Visual Art Generator

**Real-time Environmental Visual Art Generator** is an open-source web application that transforms audio input and environmental data into dynamic, real-time visual art. Utilizing modern web technologies like `p5.js` and the Web Audio API, this project offers an immersive experience by reacting to music, microphone input, and various environmental data such as battery level and video feed from a webcam. Designed to enhance digital art presentations, it adds a layer of interaction, creating unique and personalized visual outputs based on the surrounding environment and user interaction.

## Features

- **Real-time Audio Visualization**: Visualizes both music files and microphone input.
- **Video Background**: Uses webcam feed as a dynamic background.
- **Battery Level Integration**: Adjusts visual elements based on the current battery level.
- **Full-Screen Experience**: Automatically resizes to fit the browser window.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/interactive-music-visualizer.git
   cd interactive-music-visualizer
   ```

2. Open `index.html` in your web browser.

3. To run a local server (recommended), use Python or Node.js:
   - **Python**:
     ```sh
     python -m http.server
     ```
     Open your browser and navigate to `http://localhost:8000`.
   - **Node.js (http-server)**:
     ```sh
     npm install -g http-server
     http-server
     ```
     Open your browser and navigate to `http://localhost:8080`.

## Usage

1. **Play/Pause**: Click the "Play/Pause" button to start or pause the audio visualization.
2. **Use Microphone**: Click the "Use Microphone" button to switch the audio input to the microphone.
3. **Load Audio File**: Use the file input to load an audio file from your device for visualization.

## Contribution

We welcome contributions from the open-source community! If you have ideas for new features or improvements, please open an issue or submit a pull request.

### To Do:
- Add support for ambient light sensors.
- Integrate accelerometer data for device motion-based interactions.
- Enhance visual effects and add more customization options.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Cultural Impact

This project aims to empower the micro-cultural community by leveraging digital art to create immersive and interactive experiences. By integrating real-time environmental data, the visual art generated by this project reflects the unique characteristics of the user's surroundings, promoting a deeper connection between the art and its audience. This fusion of technology and creativity can enhance the visibility and influence of micro-cultural movements, providing a platform for artistic expression that is both modern and deeply personal.

## Acknowledgements

This project is built using [p5.js](https://p5js.org/) and inspired by the need for interactive and responsive digital art.
