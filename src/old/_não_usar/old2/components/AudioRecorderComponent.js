import React, { Component } from "react";
import * as ExternalWaveformPlaylist from "waveform-playlist";
import "./styles/main.css";

var playlist;
var eventEmmiter;
function InitRecorder() {
  playlist = ExternalWaveformPlaylist.init({
    ac: new (window.AudioContext || window.webkitAudioContext)(),
    sampleRate: new (
      window.AudioContext || window.webkitAudioContext
    ).sampleRate(),
    container: document.getElementById("playlist"),
    timescale: true,
    state: "select",
    samplesPerPixel: 1024,
    isAutomaticScroll: true,
    colors: {
      waveOutlineColor: "#E0EFF1",
      timeColor: "grey",
      fadeColor: "black",
    },
  });

  eventEmmiter = playlist.getEventEmitter();
}

export default class AudioRecorderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      playing: false,
      recordStream: null,
      constructorHasRun: false,
      lastRecordedAudio: null,
      currentRecordedAudio: null,
    };
  }
  componentDidMount() {
    InitRecorder();
    playlist
      .load([
        {
          src:
            "https://file-examples-com.github.io/uploads/2017/11/file_example_WAV_1MG.wav",
        },
      ])
      .then(function () {
        //can do stuff with the playlist.
      });
  }

  DoRecord = () => {
    eventEmmiter.emit("record");
    this.setState({
      ...this.state,
      playing: false,
      recording: true,
      lastRecordedAudio: null,
    });
  };

  DoPause = () => {
    eventEmmiter.emit("pause");
    this.setState({ ...this.state, playing: false, recording: false });
  };

  DoStop = () => {
    eventEmmiter.emit("stop");
    if (recording) {
      //todo
    } else waveSurferComponent.getInstance().pause();

    this.setState({ ...this.state, playing: false, recording: false });
  };

  DoPlay = () => {
    eventEmmiter.emit("play");

    this.setState({ ...this.state, playing: true, recording: false });
  };

  render() {
    return (
      <div>
        <h1>Your song</h1>

        <div id="top-bar" className="playlist-top-bar">
          <div className="playlist-toolbar">
            <div className="btn-group">
              <span className="btn-record btn btn-danger">
                <i className="fa fa-microphone"></i>
              </span>
              <span className="btn-pause btn btn-warning">
                <i className="fa fa-pause"></i>
              </span>
              <span onClick={this.DoPlay} className="btn-play btn btn-success">
                <i className="fa fa-play"></i>
              </span>
              <span onClick={this.DoPause} className="btn-stop btn btn-danger">
                <i className="fa fa-stop"></i>
              </span>
              <span className="btn-rewind btn btn-success">
                <i className="fa fa-fast-backward"></i>
              </span>
              <span className="btn-fast-forward btn btn-success">
                <i className="fa fa-fast-forward"></i>
              </span>
            </div>
            <span className="audio-pos"></span>
          </div>
        </div>

        <div id="playlist"></div>
      </div>
    );
  }
}
