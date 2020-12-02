import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import MinimapPlugin from "wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js";
import RegionPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import SpectrogramPlugin from "wavesurfer.js/dist/plugin/wavesurfer.spectrogram.min.js";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js";
import MicrophonePlugin from "wavesurfer.js/dist/plugin/wavesurfer.microphone.js";
import ElanPlugin from "wavesurfer.js/dist/plugin/wavesurfer.elan.min.js";

var waveSurfer = undefined;

document.addEventListener("DOMContentLoaded", function (event) {
  CreateWaveSurferInstance();
});

const CreateWaveSurferInstance = () => {
  waveSurfer = WaveSurfer.create({
    container: "#waveform",
    waveColor: "violet",
    progressColor: "purple",
    backend: "MediaElementWebAudio",
    plugins: [
      TimelinePlugin.create({
        container: "#wave-timeline",
      }),
      MicrophonePlugin.create(),
      CursorPlugin.create({
        showTime: true,
        opacity: 1,
        customShowTimeStyle: {
          "background-color": "#000",
          color: "#fff",
          padding: "2px",
          "font-size": "10px",
        },
      }),
    ],
  });
};

const waveSurferComponent = {
  getInstance: function () {
    return waveSurfer;
  },

  isStarted: function () {
    return waveSurfer == null;
  },
  createInstance: function () {
    CreateWaveSurferInstance();
  },
};

setTimeout(() => {}, 3000);
export default waveSurferComponent;
