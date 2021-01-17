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
var lastPropsRecorderEnabled;
const AudioRecorderID = "app";

//var editor = PKAudioEditor.init("app");

function ReactSoundRecorder(props) {
  const [initialized, setInitialized] = useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    console.log('teste');
    if (initialized) return;
    lastPropsRecorderEnabled = props.recorderEnabled;
    translationCore.Initialize({ language: props.language ? props.language : "en" });

    editor = PKAudioEditor.init(AudioRecorderID);
    setInitialized(true);
  }, []);

  useEffect(() => {
    lastPropsRecorderEnabled = props.recorderEnabled;
    console.log('new Props: ' + props.recorderEnabled)
    editor.ui.EnableDisableRecordFunction(props.recorderEnabled);
  } , [props.recorderEnabled]);

  return (
    <div
      style={{ display: "inline-table", width: "100%" }}
      data-record-enabled={props.recorderEnabled == true }
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
  
  editor.ui.EnableDisableRecordFunction(lastPropsRecorderEnabled);
  
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
