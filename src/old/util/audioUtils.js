function teste(fileSource, callback) {
  var audio = new Audio();
  audio.volume = 0;
  audio.addEventListener("canplay", function () {
    callback(audio.duration * 1000);
  });

  audio.onerror = function () {
    alert("Falha ao carregar: " + mp3URL);
    document.getElementById("load-mp3-url").value = "";
  };

  // this demo is using <audio> instead of XMLHttpRequest
  // to fix cross-origin erros
  // however we are still unable to read cross-origin mp3 files
  // Chrome returns zeros-data for CORS-mp3 file.
  audio.src = mp3URL;
}
