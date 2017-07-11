
signal.buffer.distortionCurve = function (buffer, channel, sampleIndex, amount) {
    var x = sampleIndex * 2 / buffer.length - 1;
    return (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
};

signal.buffer.reverbImpulseResponse = function (buffer, channel, sampleIndex, decay) {
    // From https://github.com/web-audio-components/simple-reverb/
    return (Math.random() * 2 - 1) *
        Math.pow(1 - sampleIndex / buffer.length, decay);
};

signal.define("signal.distortion", {
    type: "signal.signal",

    components: {
        distortionCurve: {
            type: "signal.buffer.functionSource",
            funcName: "signal.buffer.distortionCurve",
            // TODO: How do we express a dependency on a property?
            // This function will need to be data bound to the
            // {that}.amount property
            args: ["{that}.amount"],
            numChannels: 1,
            length: 8192
        },

        distortion: {
            type: "signal.waveshaper",
            // TODO: We will need some kind of schematic information
            // about a waveshaper so that we know it accepts a mono Float32Array
            // instead of an AudioBuffer.
            // Alternatively, Buffer-consuming Signals will need to be able
            // to accept any type of buffer and do the right thing.
            curve: "{distortionCurve}"
        }
    },

    inputs: ["{distortion}.0"],
    outputs: ["{distortion}.0"],
    parameters: {},

    amount: 50
});

signal.define("signal.reverb", {
    type: "signal.signal",

    components: {
        impulseResponse: {
            type: "signal.buffer.functionSource",
            funcName: "signal.buffer.reverbImpulseResponse",
            args: ["{that}.duration"], // TODO: Also needs to be expressed dynamically!
            numChannels: 2,
            length: 132300 // TODO: This needs to be expressed dynamically
                           // based on a property and the current
                           // sample rate!
        },

        convolver: {
            type: "signal.convolver",
            normalize: true,
            buffer: "{impulseResponse}"
        }
    },

    inputs: ["{convolver}.0"],
    outputs: ["{convolver}.0"],
    duration: 2.0, // TODO: See above.
    decay: 3.0 // TODO: See above.
});

signal.define("example.drumVoice", {
    type: "signal.signal",

    components: {
        bufferPlayer: {
            type: "signal.bufferPlayer",
        },

        distortion: {
            type: "signal.distortion",
            inputs: {
                "0": "{bufferPlayer}.outputs.0"
            }
        },

        reverb: {
            type: "signal.reverb",
            duration: 3,
            decay: 2,
            inputs: {
                "0": "{distortion}.outputs.0"
            }
        },

        cutoffFrequency: {
            type: "signal.value",
            value: 1000
        },

        q: {
            type: "signal.value",
            inputs: {
                value: 12
            }
        },

        lpf: {
            type: "signal.biquadFilter",
            filterType: "lowpass" // TODO: Name clash with above!
                                  // The property specified in the
                                  // Web Audio API for this is "type".
            inputs: {
                "0": "{reverb}.outputs.0",
                q: "{q}.outputs.0",
                frequency: "{cutoffFrequency}.output.0"
            }
        },

        amp: {
            type: "signal.value",
            inputs: {
                value: 0.8
            }
        },

        ampEnv: {
            type: "signal.asr",
            startLevel: 0.0,
            attackTime: 0.1,
            attackLevel: 1.0,
            sustainTime: 1.0,
            releaseTime: 0.25,
            releaseLevel: 0.0,
            inputs: {
                "0": "{lpf}.outputs.0",
                gain: "{amp}.outputs.0"
            }
        }
    }
});

signal.define("example.drumMachine", {
    type: "signal.signal",

    components: {
        kickBuffer: {
            type: "signal.buffer.urlSource",
            url: "audio/kick-drum.mp3"
        },

        snareBuffer: {
            type: "signal.buffer.urlSource",
            // Not really a snare sound, but you get the idea!
            url: "data:audio/wav;base64,UklGRngAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YVQAAAAAAM0MmRlmJjMzAEDMTJlZZmYyc/9/MnNmZplZzEwAQDMzZiaZGc0MAAAz82fmmtnNzADANLNnppqZzowBgM6MmplnpjSzAMDNzJrZZ+Yz8wAAzQw="
        },

        hihatBuffer: {
            type: "signal.buffer.urlSource",
            url: "audio/hihat.mp3"
        },

        clapBuffer: {
            type: "signal.buffer.urlSource",
            url: "audio/clap.mp3"
        },

        kick: {
            type: "signal.drumVoice",
            components: {
                bufferPlayer: {
                    buffer: "{kickBuffer}"
                }
            }
        },

        snare: {
            type: "signal.drumVoice",
            components: {
                bufferPlayer: {
                    buffer: "{snareBuffer}"
                }
            }
        },

        hihat: {
            type: "signal.drumVoice",
            components: {
                bufferPlayer: {
                    buffer: "{hihatBuffer}"
                }
            }
        },

        clap: {
            type: "signal.drumVoice",
            components: {
                bufferPlayer: {
                    buffer: "{clapBuffer}"
                }
            }
        }
    }
});
