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
    if (waveSurfer) {
      waveSurfer.empty();
      waveSurfer.destroy();
    }
    CreateWaveSurferInstance();
  },

  cancelAjax: function () {
    return waveSurfer.cancelAjax();
  },
  destroy: function () {
    return waveSurfer.destroy();
  },
  empty: function () {
    return waveSurfer.empty();
  },
  getActivePlugins: function () {
    return waveSurfer.getActivePlugins();
  },
  getBackgroundColor: function () {
    return waveSurfer.getBackgroundColor();
  },
  getCurrentTime: function () {
    return waveSurfer.getCurrentTime();
  },
  getCursorColor: function () {
    return waveSurfer.getCurrentTime();
  },
  getDuration: function () {
    return waveSurfer.getDuration();
  },
  getPlaybackRate: function () {
    return waveSurfer.getPlaybackRate();
  },
  getProgressColor: function () {
    return waveSurfer.getProgressColor();
  },
  getVolume: function () {
    return waveSurfer.getVolume();
  },
  getMute: function () {
    return waveSurfer.getMute();
  },
  getFilters: function () {
    return waveSurfer.getFilters();
  },
  getWaveColor: function () {
    return waveSurfer.getWaveColor();
  },
  isPlaying: function () {
    return waveSurfer.isPlaying();
  },
  skipBackward: function () {
    return waveSurfer.skipBackward();
  },
  skipForward: function () {
    return waveSurfer.skipForward;
  },
  setSinkId: function (SinkId) {
    return waveSurfer.setSinkId(SinkId);
  },
  stop: function () {
    return waveSurfer.stop();
  },
  toggleMute: function () {
    return waveSurfer.toggleMute();
  },
  toggleInteraction: function () {
    return waveSurfer.toggleInteraction();
  },
  toggleScroll: function () {
    return waveSurfer.toggleScroll();
  },
  unAll: function () {
    return waveSurfer.unAll();
  },
  pause: function () {
    return waveSurfer.pause();
  },
  playPause: function () {
    return waveSurfer.playPause();
  },
  exportPCM: function (length, accuracy, noWindow, start) {
    return waveSurfer.exportPCM(length, accuracy, noWindow, start);
  },
  exportImage: function (format, quality, type) {
    return waveSurfer.exportImage(format, quality, type);
  },
  play: function (start, end) {
    return waveSurfer.play(start, end);
  },
  load: function (url, peaks, preload) {
    return waveSurfer.load(url, peaks, preload);
  },
  loadBlob: function (url) {
    return waveSurfer.loadBlob(url);
  },
  on: function (eventName, callback) {
    return waveSurfer.on(eventName, callback);
  },
  un: function (eventName, callback) {
    return waveSurfer.un(eventName, callback);
  },
  seekAndCenter: function (progress) {
    return waveSurfer.seekAndCenter(progress);
  },
  seekTo: function (progress) {
    return waveSurfer.seekTo();
  },
  setBackgroundColor: function (color) {
    return waveSurfer.setBackgroundColor(color);
  },
  setCursorColor: function (color) {
    return waveSurfer.setCursorColor(color);
  },
  setHeight: function (height) {
    return waveSurfer.setHeight(height);
  },
  setFilter: function (filters) {
    return waveSurfer.setFilter(filters);
  },
  setPlaybackRate: function (rate) {
    return waveSurfer.setPlaybackRate(rate);
  },
  setPlayEnd: function (position) {
    return waveSurfer.setPlayEnd(position);
  },
  setVolume: function (newVolume) {
    return waveSurfer.setVolume(newVolume);
  },
  setMute: function (mute) {
    return waveSurfer.setMute(mute);
  },
  setProgressColor: function (color) {
    return waveSurfer.setProgressColor(color);
  },
  setWaveColor: function (color) {
    return waveSurfer.setWaveColor(color);
  },
  skip: function (offset) {
    return waveSurfer.skip(offset);
  },
  zoom: function (pxPerSec) {
    return waveSurfer.zoom(pxPerSec);
  },
};

setTimeout(() => {}, 3000);
export default waveSurferComponent;
