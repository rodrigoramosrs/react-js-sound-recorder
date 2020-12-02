import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";
import ReactSoundRecorder from "../../src";

class Demo extends Component {
  state = {
    fullscreen: false,
  };

  fullscreenToggle = () => {
    this.setState({ fullscreen: !this.state.fullscreen });
  };
  render() {
    return (
      <div>
        <div style={{ backgroundColor: "white", padding: "12px" }}>
          <h1>React Audio Recorder</h1>
          <ReactSoundRecorder />
        </div>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));