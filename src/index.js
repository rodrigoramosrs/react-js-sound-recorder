import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import RecordRTC from "recordrtc";
import waveSurferComponent from "./components/waveSurferComponent";
import blobUtil from "./util/blobutil";

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

      await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(async function (stream) {
          setRecordStream(stream);

          let recorder = RecordRTC(stream, {
            type: "audio",
          });
          setRecorder(recorder);
          setCanRecord(true);
          //await sleep(3000);
        })
        .catch((ex) => {
          console.log("Cannot record." + ex);
          setCanRecord(false);
        });

      setConstructorHasRun(true);
    }
    constructor();
  }, []);

  function DoRecord() {
    setPlaying(false);
    setRecording(true);
    setLastRecordedAudio(null);
    waveSurferComponent.getInstance().microphone.start();
    setTimeout(() => {
      recorder.startRecording();
    }, 1000);
  }

  function DoPause() {
    if (recording) {
      waveSurferComponent.getInstance().microphone.stop();
      recorder.stopRecording(async function () {
        let blob = recorder.getBlob();

        debugger;
        let currentBlob = await blobUtil.appendBlob(currentRecordedAudio, blob);
        setLastRecordedAudio(blob);
        setCurrentRecordedAudio(currentBlob);
        waveSurferComponent
          .getInstance()
          .load(URL.createObjectURL(currentBlob));
      });
    } else waveSurferComponent.getInstance().pause();

    setPlaying(false);
    setRecording(false);
  }

  function DoPlay() {
    setPlaying(true);
    setRecording(false);
    waveSurferComponent.getInstance().play();
  }

  function handleAlertClick() {
    setTimeout(() => {
      alert("Você clicou: " + count);
    }, 3000);
  }

  return (
    <div>
      <div id="waveform"></div>
      <div id="wave-timeline"></div>
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
