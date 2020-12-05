import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import RecordRTC, { MediaStreamRecorder } from "recordrtc";
import waveSurferComponent from "./components/waveSurferComponent";
import blobUtil from "./util/blobutil";
import { calculateTimeDuration } from "./util/timeUtils";

import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";
import MicIcon from "@material-ui/icons/Mic";
import MicNoneIcon from "@material-ui/icons/MicNone";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

import DeleteIcon from "@material-ui/icons/Delete";

const sleep = (m) => new Promise((r) => setTimeout(r, m));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    margin: theme.spacing(1),
    width: "100%",
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

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

  const [checked, setChecked] = React.useState(false);
  const classes = useStyles();

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

  function DoDeleteRegin() {
    let regions = waveSurferComponent.getInstance().regions.list;
    debugger;
  }
  function handleAlertClick() {
    setTimeout(() => {
      alert("Você clicou: " + count);
    }, 3000);
  }

  return (
    <div style={{ width: "100%" }}>
      <div className={classes.root}>
        <Paper
          elevation={4}
          className={classes.paper}
          style={{ margin: "10px 10 10px 0" }}
        >
          <Grid container spacing={3}>
            {/*
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

                    {currentRecordedAudio && !recording && (
                      <div>
                        <audio controls>
                          <source
                            src={URL.createObjectURL(currentRecordedAudio)}
                          />
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
                */}
            <Grid item xs={12} spacing={3}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{ height: "96px", background: "rgba(0,0,0,0.8)" }}
                >
                  <Fade
                    in={!recording}
                    {...(!recording
                      ? { timeout: recording ? 5000 : 1000 }
                      : {})}
                  >
                    <div
                      className={classes.container}
                      style={{ display: "contents", position: "absolute" }}
                    >
                      <div
                        style={{
                          position: "relative",
                          background: "rgba(0,0,0,0.8)",
                        }}
                        id="waveform"
                      ></div>
                      <div id="progress-bar"></div>
                      <div id="wave-timeline"></div>
                    </div>
                  </Fade>
                  <Fade
                    in={recording}
                    {...(recording ? { timeout: recording ? 0 : 0 } : {})}
                  >
                    <Grid item container>
                      <Grid item xs={12}>
                        <div
                          style={{
                            textAlign: "center",
                            marginTop: "30px",
                          }}
                        >
                          <Chip
                            icon={<MicIcon />}
                            label="Gravando ..."
                            //onDelete={handleDelete}
                            color="secondary"
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </Fade>
                </Grid>
                <Grid item xs={12}>
                  <Grid item container>
                    <Grid item xs={9}>
                      <Grid item container>
                        <Grid item xs={4}>
                          <Button
                            variant="contained"
                            disabled={recording || playing}
                            color="secondary"
                            className={classes.button}
                            onClick={DoRecord}
                            startIcon={
                              !recording ? <MicIcon /> : <MicNoneIcon />
                            }
                          >
                            Record
                          </Button>
                        </Grid>

                        <Grid item xs={4}>
                          <Button
                            variant="contained"
                            disabled={!recording && !playing}
                            color="primary"
                            onClick={DoPause}
                            className={classes.button}
                            startIcon={
                              playing || recording ? (
                                <PauseCircleFilledIcon />
                              ) : (
                                <PauseCircleOutlineIcon />
                              )
                            }
                          >
                            Pause
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            variant="contained"
                            disabled={recording || playing}
                            color="primary"
                            className={classes.button}
                            onClick={DoPlay}
                            startIcon={
                              playing ? (
                                <PlayCircleOutlineIcon />
                              ) : (
                                <PlayCircleFilledIcon />
                              )
                            }
                          >
                            Play
                          </Button>
                        </Grid>
                        {/* <Grid item xs={3}>
                          <Button
                            variant="contained"
                            disabled={recording || playing}
                            color="primary"
                            className={classes.button}
                            onClick={DoDeleteRegin}
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        </Grid> */}
                      </Grid>
                    </Grid>
                    <Grid item xs={3}>
                      <Grid item container>
                        <Grid item xs={6}>
                          {recording && (
                            <Typography variant="subtitle2" gutterBottom>
                              <div>
                                Record:{" "}
                                <b>
                                  {calculateTimeDuration(lastRecordedAudioTime)}
                                </b>
                              </div>
                            </Typography>
                          )}
                          {!recording && (
                            <Typography variant="subtitle2" gutterBottom>
                              <div>
                                Playback:{" "}
                                <b>
                                  {calculateTimeDuration(cursorTimePosition)}
                                </b>
                              </div>
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2" gutterBottom>
                            <div>
                              Total:{" "}
                              <b>
                                {calculateTimeDuration(
                                  currentRecordedAudioTime
                                )}
                              </b>
                            </div>
                          </Typography>
                        </Grid>
                        <div>
                          <p></p>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <FormControlLabel
          control={
            <Switch checked={checked} onChange={() => setChecked(!checked)} />
          }
          label="Show"
        />
      </div>
    </div>
  );
}

ReactSoundRecorder.propTypes = {
  children: PropTypes.any,
  //fullScreen: PropTypes.bool,
  //allowScrollbar: PropTypes.bool,
};

export default ReactSoundRecorder;
