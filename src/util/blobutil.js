const blobUtil = {
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
    debugger;

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
    debugger;

    //return new Blob([new Uint8Array(buffer, byteOffset, length)]);;
    let result = new Blob(
      [new Uint8Array(conversionArray, 0, conversionArray.length)],
      { type: sourceBlob.type }
    );
    return result;
  },
};

export default blobUtil;
