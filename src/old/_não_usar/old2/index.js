import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AudioRecorderComponent from "./components/AudioRecorderComponent";
import "./components/styles/bootstrap.3.css";
import "./components/styles/fontAwesome.4.4.0.css";
const sleep = (m) => new Promise((r) => setTimeout(r, m));

function ReactSoundRecorder() {
  const [count, setCount] = useState(0);

  const [canRecord, setCanRecord] = useState(false);
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [recordStream, setRecordStream] = useState(false); //This is a Input Stream (like Microphone)
  const [recorder, setRecorder] = useState(false); //This is a Input Stream (like Microphone)
  const [constructorHasRun, setConstructorHasRun] = useState(false); //Constructor Control

  const [lastRecordedAudio, setLastRecordedAudio] = useState(null); //Constructor Control
  const [currentRecordedAudio, setCurrentRecordedAudio] = useState(null); //Constructor Control

  useEffect(() => {
    async function constructor() {
      if (constructorHasRun) return;

      console.log("Initializing Recorder Engine...");

      setConstructorHasRun(true);
    }
    constructor();
  }, []);

  function DoRecord() {
    setPlaying(false);
    setRecording(true);
    setLastRecordedAudio(null);
  }

  function DoPause() {
    if (recording) {
      //todo
    } else waveSurferComponent.getInstance().pause();

    setPlaying(false);
    setRecording(false);
  }

  function DoPlay() {
    setPlaying(true);
    setRecording(false);
  }

  function handleAlertClick() {
    setTimeout(() => {
      alert("Você clicou: " + count);
    }, 3000);
  }

  return (
    <div>
      <AudioRecorderComponent />
      {canRecord && (
        <div>
          <p>Recording: {recording ? "sim" : "não"}</p>
          <p>Playing: {playing ? "sim" : "não"}</p>

          {recording ? null : <button onClick={DoRecord}>Gravar</button>}
          {!recording ? null : <button onClick={DoPlay}>Reproduzir</button>}
          <button onClick={DoPause}>Parar</button>
        </div>
      )}
      {!canRecord && <div>starting</div>}
    </div>
  );
}

ReactSoundRecorder.propTypes = {
  children: PropTypes.any,
  //fullScreen: PropTypes.bool,
  //allowScrollbar: PropTypes.bool,
};

export default ReactSoundRecorder;
