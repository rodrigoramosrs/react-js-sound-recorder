import toWav from "./audioBufferToWave";
var context = new (window.AudioContext || window.webkitAudioContext)();

const blobUtil = {
  appendBuffer: async function (sourceBlob, destinationBlob) {
    if (!sourceBlob) return destinationBlob;
    if (!destinationBlob) return sourceBlob;

    let buffer1 = await sourceBlob.arrayBuffer();
    let buffer2 = await destinationBlob.arrayBuffer();

    buffer1 = await context.decodeAudioData(buffer1);
    buffer2 = await context.decodeAudioData(buffer2);

    var numberOfChannels = Math.min(
      buffer1.numberOfChannels,
      buffer2.numberOfChannels
    );
    var tmp = context.createBuffer(
      numberOfChannels,
      buffer1.length + buffer2.length,
      buffer1.sampleRate
    );
    for (var i = 0; i < numberOfChannels; i++) {
      var channel = tmp.getChannelData(i);
      channel.set(buffer1.getChannelData(i), 0);
      channel.set(buffer2.getChannelData(i), buffer1.length);
    }

    let waveArrayBuffer = toWav(tmp);

    let result = new Blob(
      [new Uint8Array(waveArrayBuffer, 0, waveArrayBuffer.byteLength)],
      {
        type: sourceBlob.type,
      }
    );
    return result;
  },
  appendBlob: async function (sourceBlob, destinationBlob) {
    if (!sourceBlob) return destinationBlob;
    if (!destinationBlob) return sourceBlob;

    let sourceBuffer = await sourceBlob.arrayBuffer();
    let destinationBuffer = await destinationBlob.arrayBuffer();

    var conversionArray = new Uint8Array(
      sourceBuffer.byteLength + destinationBuffer.byteLength
    );
    conversionArray.set(new Uint8Array(sourceBuffer), 0);
    conversionArray.set(
      new Uint8Array(destinationBuffer),
      sourceBuffer.byteLength
    );

    //return new Blob([new Uint8Array(buffer, byteOffset, length)]);;
    let result = new Blob(
      [new Uint8Array(conversionArray, 0, conversionArray.length)],
      { type: sourceBlob.type }
    );
    return result;
  },
  appendBlobFromPosition: async function (
    sourceBlob,
    destinationBlob,
    position
  ) {
    if (!sourceBlob) return destinationBlob;
    if (!destinationBlob) return sourceBlob;

    let sourceBuffer = await sourceBlob.arrayBuffer();
    let destinationBuffer = await destinationBlob.arrayBuffer();

    var conversionArray = new Uint8Array(
      sourceBuffer.byteLength + destinationBuffer.byteLength
    );

    sourceBuffer.slice(position, sourceBuffer.byteLength - postion);

    conversionArray.set(new Uint8Array(sourceBuffer), 0);
    conversionArray.set(
      new Uint8Array(destinationBuffer),
      sourceBuffer.byteLength
    );

    //return new Blob([new Uint8Array(buffer, byteOffset, length)]);;
    let result = new Blob(
      [new Uint8Array(conversionArray, 0, conversionArray.length)],
      { type: sourceBlob.type }
    );
    return result;
  },
};

export default blobUtil;
