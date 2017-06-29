# Buffer Source Specifications
Buffer source specifications provide a means for expressing how a buffer should be loaded into a Signaletic context. Buffers specified within a signal specification will be automatically loaded as part of the Signaletic instantiation workflow.

## XHR-Loaded Buffer Specification
Specifies that a buffer should be loaded via a binary-typed XmlHttpRequest and loaded into an AudioBuffer.

    {
        type: "signal.buffer.urlSource",
        url: "audio/kick-drum.mp3"
    }

## Raw Buffer Specification
Directly specifies the samples of a buffer.

    {
        type: "signal.buffer.sampleSource",
        sampleRate: 44100,
        length: 44100, // Number of sample frames
        numberOfChannels: 2,
        channelData: [
            [/* channel 0's samples */],
            [/* channel 1's samples */]
        ]
    }
