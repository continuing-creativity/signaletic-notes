
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

    buffers: {
        distortionCurve: {
            type: "signal.buffer.functionSource",
            funcName: "signal.buffer.distortionCurve",
            // TODO: How do we express a dependency on a property?
            args: ["{amount}"],
            numChannels: 1,
            length: 8192
        }
    },

    signals: {
        distortion: {
            type: "signal.waveshaper",
            // TODO: How do we express a reference to
            // the distortionCurve buffer,
            // since the WaveShaperNode
            // expects to get a raw Float32Array
            curve: "{buffers}.distortionCurve.channelData.0"
        }
    },

    inputs: ["{distortion}.0"],
    outputs: ["{distortion}.0"],
    parameters: {},
    properties: {
        amount: {
            value: 50,
            onChange: [
                {
                    func: "{that}.refreshBuffer",
                    args: ["distortionCurve"]
                }
            ]
        }
    }
});

signal.define("signal.reverb", {
    type: "signal.signal",

    buffers: {
        impulseResponse: {
            type: "signal.buffer.functionSource",
            funcName: "signal.buffer.reverbImpulseResponse",
            args: [2.0], // TODO: Also needs to be expressed dynamically!
            numChannels: 2,
            length: 132300 // TODO: This needs to be expressed dynamically
                           // based on a property and the current
                           // sample rate!
        }
    },

    signals: {
        convolver: {
            type: "signal.convolver",
            normalize: true
        }
    },

    inputs: ["{convolver}.0"],
    outputs: ["{convolver}.0"],
    properties: {
        "duration": "", // TODO: See above.
        "decay": "" // TODO: See above.
    }
});

signal.define("example.drumVoice", {
    type: "signal.signal",

    signals: {
        bufferPlayer: {
            type: "signal.bufferPlayer",
            buffer: "snare"
        },

        distortion: {
            type: "signal.distortion"
        },

        reverb: {
            type: "signal.reverb",
            duration: 3,
            decay: 2
        },

        lpf: {
            type: "signal.biquadFilter",
            filterType: "lowpass" // TODO: Name clash with above!
                                  // The property specified in the
                                  // Web Audio API for this is "type".
        },

        q: {
            type: "signal.value",
            value: 12
        },

        cutoffFrequency: {
            type: "signal.value",
            value: 1000
        },

        ampEnv: {
            type: "signal.asr",
            startLevel: 0.0,
            attackTime: 0.1,
            attackLevel: 1.0,
            sustainTime: 1.0,
            releaseTime: 0.25,
            releaseLevel: 0.0
        },

        amp: {
            type: "signal.value",
            value: 0.8
        }
    },

    connections: {
        "{bufferPlayer}.0": "{distortion}.0",
        "{distortion}.0": "{reverb}.0",
        "{reverb}.0": "{lpf}.0",
        "{q}": "{lpf}.q",
        "{cutoffFrequency}": "{lpf}.frequency",
        "{lpf}": "{ampEnv}",
        "{amp}": "{ampEnv}.gain"
    }
});

signal.define("example.drumMachine", {
    type: "signal.signal",

    buffers: {
        kick: {
            type: "signal.buffer.urlSource",
            url: "audio/kick-drum.mp3"
        },

        snare: {
            type: "signal.buffer.urlSource",
            // Not really a snare sound, but you get the idea!
            url: "data:audio/wav;base64,UklGRngAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YVQAAAAAAM0MmRlmJjMzAEDMTJlZZmYyc/9/MnNmZplZzEwAQDMzZiaZGc0MAAAz82fmmtnNzADANLNnppqZzowBgM6MmplnpjSzAMDNzJrZZ+Yz8wAAzQw="
        },

        hihat: {
            type: "signal.buffer.urlSource",
            url: "audio/hihat.mp3"
        },

        clap: {
            type: "signal.buffer.urlSource",
            url: "audio/clap.mp3"
        }
    },

    signals: {
        kick: {
            type: "signal.drumVoice",
            signals: {
                bufferPlayer: {
                    bufferName: "kick"
                }
            }
        },

        snare: {
            type: "signal.drumVoice",
            signals: {
                bufferPlayer: {
                    bufferName: "snare"
                }
            }
        },

        hihat: {
            type: "signal.drumVoice",
            signals: {
                bufferPlayer: {
                    bufferName: "hihat"
                }
            }
        },

        clap: {
            type: "signal.drumVoice",
            signals: {
                bufferPlayer: {
                    bufferName: "clap"
                }
            }
        }
    }
});
