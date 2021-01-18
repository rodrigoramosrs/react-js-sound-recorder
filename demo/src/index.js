import React, { Component } from "react";
import { render } from "react-dom";
//import "./style.css";
import ReactSoundRecorder, {
  loadFromUrl,
  getMP3AudioBuffer,
  getWaveAudioBuffer,
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
    recorderEnabled: false,
    editorVisivel: true
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
  saveMP3File = () => {
    getMP3AudioBuffer(function(progress){
      console.log('Progress: ' + progress)
    },
    function(mp3File){
      if (!mp3File) return;


      var url = (window.URL || window.webkitURL).createObjectURL(mp3File);

      var a = document.createElement("a");
      a.href = url;
      a.download = "output.mp3";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
    });
  };

  saveDefaultWavFile = () => {
    getWaveAudioBuffer(function(progress){
      console.log('Progress: ' + progress)
    },
    function(wavFile){
      if (!wavFile) return;


      var url = (window.URL || window.webkitURL).createObjectURL(wavFile);

      var a = document.createElement("a");
      a.href = url;
      a.download = "output.wav";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
    });
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
                value="Salvar Arquivo MP3"
                onClick={this.saveMP3File}
              />
            </p>
            <p>
              <input
                type="button"
                value="Salvar Arquivo WAV (Default)"
                onClick={this.saveDefaultWavFile}
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
            <p>
              <input
                type="button"
                value="Exibir/Ocultar Gravador"
                onClick={() => this.setState({editorVisivel: !this.state.editorVisivel}) }
              />
              ({this.state.editorVisivel ? "true" : "false"})
            </p>
          </div>
        </div>
        <div style={{ width: "600px", position: "relative" }}>
          {this.state.editorVisivel && (<ReactSoundRecorder customTranslationTable={null} recorderEnabled={this.state.recorderEnabled}  language="pt-br" />)}
          
        </div>
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
