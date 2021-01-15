import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import audioBufferToWav from "./converter/audioBufferToWav";
import translationCore, { Translate } from "./i10n/translation_core";

import "./lib/oneup.js";

import "./lib/dist/wavesurfer.js";
import "./lib/dist/plugin/wavesurfer.regions.js";

import "./lib/app.js";
import "./lib/recorder.js";
import "./lib/contextmenu.js";
import "./lib/engine.js";
import "./lib/actions.js";

import "./lib/drag.js";

import "./lib/fx-auto.js";
import "./lib/fx-pg-eq.js";

import "./lib/id3.js";

import "./lib/keys.js";

import "./lib/local.js";
import "./lib/lz4-block-codec-wasm.js";
import "./lib/lzma.js";
// import "./lib/main.css";
import "./lib/modal.js";

import "./lib/state.js";
import "./lib/ui-fx.js";
import "./lib/ui.js";

// import "./lib/welcome.js";

// import "./lib/fonts/icomoon.eot";
// import "./lib/fonts/icomoon.svg";
// import "./lib/fonts/icomoon.ttf";
// import "./lib/fonts/icomoon.woff";

var editor;
const AudioRecorderID = "app";

//var editor = PKAudioEditor.init("app");

function ReactSoundRecorder() {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (initialized) return;
    translationCore.Initialize({ language: "en" });

    editor = PKAudioEditor.init(AudioRecorderID);
    setInitialized(true);
  }, []);

  return (
    <div
      style={{ display: "inline-table", width: "100%" }}
      id={AudioRecorderID}
    />
  );
}

export function setLanguage(language) {
  translationCore.Initialize({ language: language });

  let audioBuffer;
  if (editor.engine.is_ready) audioBuffer = getAudioBuffer();

  document.getElementById(AudioRecorderID).innerHTML = "";
  editor = PKAudioEditor.init(AudioRecorderID);

  if (audioBuffer) editor.engine.LoadArrayBuffer(new Blob([audioBuffer]));
}

export function loadFromUrl(url) {
  if (!editor) {
    alert("Gravador não incializado.");
    return;
  }

  editor.engine.LoadURL(url);
}

export function loadFromFile(file) {
  if (!editor) {
    alert("Gravador não incializado.");
    return;
  }
  editor.engine.LoadFile(file);
}

export function loadFromSample(sample) {
  if (!editor) {
    alert("Gravador não incializado.");
    return;
  }
  editor.engine.LoadSample(sample);
}

export function getAudioBuffer() {
  var wav = audioBufferToWav(editor.engine.wavesurfer.backend.buffer);
  return wav;
}

ReactSoundRecorder.propTypes = {
  children: PropTypes.any,
  //fullScreen: PropTypes.bool,
  //allowScrollbar: PropTypes.bool,
};

export default ReactSoundRecorder;
