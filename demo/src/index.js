import React, { Component } from "react";
import { render } from "react-dom";
//import "./style.css";
import ReactSoundRecorder, {
  loadFromUrl,
  getAudioBuffer,
  setLanguage,
} from "../../src";

import "../../src/lib/main.css";
import "../../src/lib/fonts/icomoon.eot";
import "../../src/lib/fonts/icomoon.svg";
import "../../src/lib/fonts/icomoon.ttf";
import "../../src/lib/fonts/icomoon.woff";

class Demo extends Component {
  state = {
    fullscreen: false,
    recorderEnabled: false
  };

  constructor(props) {
    super(props);
  }

  fullscreenToggle = () => {
    this.setState({ fullscreen: !this.state.fullscreen });
  };

  loadAudio = () => {
    loadFromUrl(
      "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3"
    );
  };

  saveFile = () => {
    debugger;
    let audio = getAudioBuffer();

    if (!audio) return;

    var blob = new window.Blob([new DataView(audio)], {
      type: "audio/wav",
    });

    let filename = "sample-audio";
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${filename}-${+new Date()}.wav`;
    link.click();
  };

  mudarIdioma = (idioma) => {
    setLanguage(idioma);
  };

  habilitarDesabilitarBotaoGravador = () => {
    this.setState({recorderEnabled: !this.state.recorderEnabled})
  }

  render() {
    return (
      <div>
        <div style={{ padding: "12px" }}>
          <h1>React Audio Recorder</h1>
          <div>
            <p>
              <input
                type="button"
                value="Carregar Audio"
                onClick={this.loadAudio}
              />
            </p>
            <p>
              <input
                type="button"
                value="Salvar Arquivo"
                onClick={this.saveFile}
              />
            </p>
            <p>
              <input
                type="button"
                value="Mudar idioma para Portugues"
                onClick={() => this.mudarIdioma("pt_br")}
              />
            </p>
            <p>
              <input
                type="button"
                value="Mudar idioma para Ingles"
                onClick={() => this.mudarIdioma("en")}
              />
            </p>
            <p>
              <input
                type="button"
                value="Mudar idioma para Espanhol"
                onClick={() => this.mudarIdioma("es")}
              />
            </p>
            <p>
              <input
                type="button"
                value="Habilitar/Desabilitar Gravador"
                onClick={() => this.habilitarDesabilitarBotaoGravador() }
              />
              ({this.state.recorderEnabled ? "true" : "false"})
            </p>
          </div>
        </div>
        <div style={{ width: "600px", position: "relative" }}>
          <ReactSoundRecorder customTranslationTable={null} recorderEnabled={this.state.recorderEnabled}  language="pt-br" />
        </div>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
