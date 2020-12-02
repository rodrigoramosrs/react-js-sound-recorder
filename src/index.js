import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import RecordRTC from "recordrtc";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import MinimapPlugin from "wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js";
import RegionPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import SpectrogramPlugin from "wavesurfer.js/dist/plugin/wavesurfer.spectrogram.min.js";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js";
import ElanPlugin from "wavesurfer.js/dist/plugin/wavesurfer.elan.min.js";

const sleep = (m) => new Promise((r) => setTimeout(r, m));
var wavesurfer = undefined;
setTimeout(() => {
  wavesurfer = WaveSurfer.create({
    container: "#waveform",
    waveColor: "violet",
    progressColor: "purple",
    plugins: [
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
}, 3000);

async function constructor() {
  console.log("Initializing Recorder Engine...");

  await navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(async function (stream) {
      //await sleep(3000);
    })
    .catch((ex) => {
      debugger;
    });
}

function ReactSoundRecorder() {
  const [count, setCount] = useState(0);

  const [canRecord, setCanRecord] = useState(false);
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [recordStream, setRecordStream] = useState(false); //This is a Input Stream (like Microphone)
  const [recorder, setRecorder] = useState(false); //This is a Input Stream (like Microphone)
  const [constructorHasRun, setConstructorHasRun] = useState(false); //Constructor Control

  const [lastRecordedAudio, setLastRecordedAudio] = useState(null); //Constructor Control

  useEffect(() => {
    debugger;
    let teste = navigator.mediaDevices;
  }, [constructor, count]);

  useEffect(() => {
    async function constructor() {
      if (constructorHasRun) return;

      console.log("Initializing Recorder Engine...");

      debugger;
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
    recorder.startRecording();
  }

  function DoPause() {
    if (recording) {
      recorder.stopRecording(function () {
        let blob = recorder.getBlob();

        var blobUrl = URL.createObjectURL(blob);
        wavesurfer.load(blobUrl);
        setLastRecordedAudio(blob);
      });
    }

    setPlaying(false);
    setRecording(false);
    wavesurfer.pause();
  }

  function DoPlay() {
    setPlaying(true);
    setRecording(false);
    wavesurfer.play();
  }

  function handleAlertClick() {
    setTimeout(() => {
      alert("Você clicou: " + count);
    }, 3000);
  }

  return (
    <div>
      <div id="waveform"></div>
      {canRecord && (
        <div>
          <p>Recording: {recording ? "sim" : "não"}</p>
          <p>Playing: {playing ? "sim" : "não"}</p>
          <button onClick={DoRecord}>Gravar</button>
          <button onClick={DoPause}>Parar</button>
          <button onClick={DoPlay}>Reproduzir</button>
        </div>
      )}

      {!canRecord && <div>starting</div>}

      {lastRecordedAudio && (
        <div>
          {/* <AudioPlayer
            autoPlay
            src={URL.createObjectURL(lastRecordedAudio)}
            onPlay={(e) => console.log("onPlay")}
            // other props here
          /> */}
        </div>
      )}
      {/*
      <p>You clicked {count} times</p>
      <p>Record Status</p>
      <button onClick={() => setCount(count + 1)}>Mostrar</button>
      <button onClick={handleAlertClick}>Mostrar aviso</button>*/}
    </div>
  );
}

ReactSoundRecorder.propTypes = {
  children: PropTypes.any,
  //fullScreen: PropTypes.bool,
  //allowScrollbar: PropTypes.bool,
};

export default ReactSoundRecorder;
