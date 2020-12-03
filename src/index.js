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

  function AudioProcess(a, b, c) {
    debugger;
  }
  function DoRecord() {
    setPlaying(false);
    setRecording(true);
    setLastRecordedAudio(null);
    recorder.startRecording();
  }

  function DoPause() {
    if (recording) {
      recorder.stopRecording(async function () {
        let blob = recorder.getBlob();

        let currentBlob = await blobUtil.appendBuffer(
          currentRecordedAudio,
          blob
        );
        waveSurferComponent.createInstance();
        waveSurferComponent.load(URL.createObjectURL(currentBlob));

        setLastRecordedAudio(blob);
        setCurrentRecordedAudio(currentBlob);
      });
    }

    waveSurferComponent.pause();
    setPlaying(false);
    setRecording(false);
  }

  function DoPlay() {
    setPlaying(true);
    setRecording(false);
    waveSurferComponent.play();
  }

  function handleAlertClick() {
    setTimeout(() => {
      alert("Você clicou: " + count);
    }, 3000);
  }

  return (
    <div style={{ width: "300px" }}>
      <div
        style={{
          visibility: recording ? "hidden" : "visible",
          height: recording ? "0px" : "",
        }}
      >
        <div style={{ position: "relative" }} id="waveform"></div>
        <div id="progress-bar"></div>
        <div id="wave-timeline"></div>
      </div>
      {recording && <div>Gravando...</div>}
      {canRecord && (
        <div>
          <p>Recording: {recording ? "sim" : "não"}</p>
          <p>Playing: {playing ? "sim" : "não"}</p>

          {recording || playing ? null : (
            <button onClick={DoRecord}>Gravar</button>
          )}
          {recording || playing ? null : (
            <button onClick={DoPlay}>Reproduzir</button>
          )}

          {!recording || !playing ? (
            <button onClick={DoPause}>Parar</button>
          ) : null}
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
