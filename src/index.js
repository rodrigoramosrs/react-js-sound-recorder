import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./lib/oneup.js";

import "./lib/dist/wavesurfer.js";
import "./lib/dist/plugin/wavesurfer.regions.js";

import "./lib/app.js";
import "./lib/recorder.js";
import "./lib/contextmenu.js";
import "./lib/engine.js";
import "./lib/actions.js";

import "./lib/drag.js";

import "./lib/fx-auto.js";
import "./lib/fx-pg-eq.js";

import "./lib/id3.js";

import "./lib/keys.js";

import "./lib/local.js";
import "./lib/lz4-block-codec-wasm.js";
import "./lib/lzma.js";
import "./lib/main.css";
import "./lib/modal.js";

import "./lib/state.js";
import "./lib/ui-fx.js";
import "./lib/ui.js";

import "./lib/welcome.js";

import "./lib/fonts/icomoon.eot";
import "./lib/fonts/icomoon.svg";
import "./lib/fonts/icomoon.ttf";
import "./lib/fonts/icomoon.woff";

// import "./lib/index-cache.html";
// import "./lib/index.html";
// import "./lib/eq.html";
// import "./lib/sp.html";
// import "./lib/about.html";

//import "./lib/ico.png";

// import "./bundle.all";

var editor;

//var editor = PKAudioEditor.init("app");

function ReactSoundRecorder() {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (initialized) return;

    editor = PKAudioEditor.init("app");
    setInitialized(true);
  }, []);
  return <div id="app"></div>;
}

ReactSoundRecorder.propTypes = {
  children: PropTypes.any,
  //fullScreen: PropTypes.bool,
  //allowScrollbar: PropTypes.bool,
};

export default ReactSoundRecorder;
