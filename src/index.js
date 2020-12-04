import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import RecordRTC, { MediaStreamRecorder } from "recordrtc";
import waveSurferComponent from "./components/waveSurferComponent";
import blobUtil from "./util/blobutil";
import { calculateTimeDuration } from "./util/timeUtils";

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

  const [lastRecordedAudioTime, setLastRecordedAudioTime] = useState(0); //Only current recoding session (by click)
  const [currentRecordedAudioTime, setCurrentRecordedAudioTime] = useState(0); //All recorded time,

  const [cursorTimePosition, setCursorTimePosition] = useState(0);

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
            recorderType: MediaStreamRecorder,
            onStateChanged: function (state) {
              console.log("Current Recorder State:" + state);
            },
            timeSlice: 100,
            onTimeStamp: function (timestamp, timestamps) {
              var duration = new Date().getTime() - timestamps[0]; /// 1000;
              if (duration < 0) return;

              let TotalRecordedTime = lastRecordedAudioTime + duration;
              setLastRecordedAudioTime(TotalRecordedTime);
            },
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
    setLastRecordedAudioTime(0);
    recorder.startRecording();
    waveSurferComponent.emptyAndDestroy();
  }

  function DoPause() {
    if (recording) {
      recorder.stopRecording(async function () {
        let blob = recorder.getBlob();

        let currentBlob = await blobUtil.appendBuffer(
          currentRecordedAudio,
          blob
        );

        waveSurferComponent.createInstance(
          function (percentage) {
            //LOADING CALLBACK
            console.log("Loading audio percentage: " + percentage);
          },
          function () {
            //PLAYBACK FINISH CALLBACK
            DoPause();
          },
          function (seconds) {
            // PLAYBACK POSITION
            setCursorTimePosition(Math.floor(seconds * 1000));
          },
          function (seconds) {
            // CURSOR POSITION
            setCursorTimePosition(Math.floor(seconds * 1000));
          }
        );
        waveSurferComponent.load(URL.createObjectURL(currentBlob));

        setCurrentRecordedAudioTime(
          currentRecordedAudioTime + lastRecordedAudioTime
        );
        setLastRecordedAudio(blob);
        setCurrentRecordedAudio(currentBlob);
      });
    } else waveSurferComponent.pause();

    setPlaying(false);
    setRecording(false);
  }

  function DoPlay() {
    setPlaying(true);
    setRecording(false);
    waveSurferComponent.play();
  }
  function downloadCurrentAudio() {
    let filename = "sample-audio";
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(currentRecordedAudio);
    link.download = `${filename}-${+new Date()}.mp3`;
    link.click();
  }

  function handleAlertClick() {
    setTimeout(() => {
      alert("Você clicou: " + count);
    }, 3000);
  }

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          visibility: recording ? "hidden" : "visible",
          height: recording ? "0px" : "",
        }}
      >
        <div
          style={{ position: "relative", background: "rgba(0,0,0,0.8)" }}
          id="waveform"
        ></div>
        <div id="progress-bar"></div>
        <div id="wave-timeline"></div>
      </div>
      {recording && <div>Gravando...</div>}
      {canRecord && (
        <div>
          <p>Recording: {recording ? "sim" : "não"}</p>
          <p>Playing: {playing ? "sim" : "não"}</p>

          {!recording && (
            <p>PlaybackPosition: {calculateTimeDuration(cursorTimePosition)}</p>
          )}

          <p>Total: {calculateTimeDuration(currentRecordedAudioTime)}</p>

          {recording && (
            <p>
              CurrentRecording: {calculateTimeDuration(lastRecordedAudioTime)}
            </p>
          )}

          {recording || playing ? null : (
            <button onClick={DoRecord}>Gravar</button>
          )}
          {recording || playing ? null : (
            <button onClick={DoPlay}>Reproduzir</button>
          )}

          {!recording || !playing ? (
            <button onClick={DoPause}>Parar</button>
          ) : null}

          {currentRecordedAudio && !recording && (
            <div>
              <audio controls>
                <source src={URL.createObjectURL(currentRecordedAudio)} />
              </audio>
            </div>
          )}

          {currentRecordedAudio && !recording && (
            <div>
              <input
                type="button"
                value="Download"
                onClick={downloadCurrentAudio}
              />
            </div>
          )}
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
