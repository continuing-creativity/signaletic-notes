
## Function Buffer Source
Specifies a function that will be invoked per sample to fill a new mono-channel buffer.

    {
        type: "signal.buffer.functionSource",
        funcName: "my.filler",
        length: 44100
    }

A fill function must implement the signature ``function (buffer, channel, sampleIndex) { return sample; }``

    my.filler = function (buffer, channel, sampleIndex) {
        return sampleIndex / buffer.length;
    };

## Fourier Table Fill Function Buffer Source

    {
        type: "signal.buffer.fourierBufferSource",
        length: 8192,
        scale: 1.0,
        numberOfHarmonics: 10,
        phaseOffset: 0.0,
        funcName: "signal.generator.saw"
    }

A table fill function must implement the signature ``function (harmonic) { return amplitudeForHarmonic; }``.

    signal.generator.saw = function (harmonic) {
        return 1.0 / harmonic;
    };
