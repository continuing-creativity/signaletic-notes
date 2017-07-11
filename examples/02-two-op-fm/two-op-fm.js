"use strict";

// TODO: Consider strategies for composing subgraphs
// into different components to make this more understandable.
// TODO: As with example #1, we need to be able to express outputs
// to the AudioContext's destination node.
signal.define("examples.chowningFMBrass", {
    type: "signal.signal",

    components: {
        frequency: {
            // This will be implemented using ConstantSourceNode
            // (or, on Safari, as a polyfill that combines a looping
            // AudioBufferSourceNode and GainNode).
            type: "signal.value",
            inputs: {
                value: 440
            }
        },

        amplitude: {
            type: "signal.value",
            inputs: {
                value: 1.0
            }
        },

        ratio: {
            type: "signal.value",
            inputs: {
                value: 2
            }
        },

        index: {
            type: "signal.value",
            inputs: {
                value: 5
            }
        },

        noteGate: {
            type: "signal.value",
            inputs: {
                value: 0.0
            }
        },

        envelope: {
            // In the greater fullness of time, this will be a custom
            // AudioWorkletNode that controls the AudioParam
            // it is connected to when the "gate" signal transitions
            // above/below 0.
            // It will also include start() and stop() methods, as per
            // the AudioScheduledSourceNode interface.
            type: "signal.envGen",

            // This is an custom envelope with user-defined breakpoints.
            // Reusable envelope shapes will be provided and be specified by type name.
            envelope: {
                levels: [0, 1, 0.75, 0.6, 0],
                times: [0.1, 0.1, 0.3, 0.1],
                sustainPoint: 2
            },

            inputs: {
                gate: "{noteGate}.outputs.0"
            }
        },

        modulatorFrequency: {
            // This will be implemented as a two-input Signal containing
            // a Gain node, and which maps the second input to its "gain" AudioParam
            type: "signal.mul",
            inputs: {
                "0": "{frequency}.outputs.0",
                "1": "{ratio}.outputs.0"
            }
        },

        deviation: {
            type: "signal.mul",
            inputs: {
                "0": "{modulatorFrequency}.outputs.0",
                "1": "{index}.outputs.0"
            }
        },

        modulatorAmplitudeGain: {
            type: "signal.mul",
            inputs: {
                "0": "{envelope}.outputs.0",
                "1": "{deviation}.outputs.0"
            }
        },

        modulator: {
            type: "signal.oscillator",
            shape: "sine",
            inputs: {
                "frequency": "{modulatorFrequency}.outputs.0"
            }
        },

        modulatorOutputGain: {
            type: "signal.gain",
            inputs: {
                "0": "{modulator}.outputs.0",
                gain: "{modulatorAmplitudeGain}.outputs.0"
            }
        },

        carrier: {
            type: "signal.oscillator",
            shape: "sine",
            inputs: {
                frequency: [
                    "{frequency}.outputs.0",
                    "{modulatorOutputGain}.outputs.0"
                ]
            }
        },

        envelopeGain: {
            type: "signal.gain",
            inputs: {
                "0": "{envelope}.outputs.0",
                gain: "{amplitude}.outputs.0"
            }
        },

        outputGain: {
            type: "signal.gain",
            inputs: {
                "0": "{carrier}.outputs.0",
                gain: "{envelopeGain}.outputs.0"
            }
        }
    }
});
