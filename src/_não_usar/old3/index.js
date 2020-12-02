import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Traks from "./util/Traks";

const sleep = (m) => new Promise((r) => setTimeout(r, m));

function ReactSoundRecorder() {
  useEffect(() => {}, []);

  return <div>OI</div>;
}

ReactSoundRecorder.propTypes = {
  children: PropTypes.any,
  //fullScreen: PropTypes.bool,
  //allowScrollbar: PropTypes.bool,
};

export default ReactSoundRecorder;
