"use strict";

signal.define("example.monoSynth", {
    // TODO: How do we wire up this synth's output
    // to the AudioContext's destination?

    parents: "signal.signal",

    components: {
        carrier: {
            type: "signal.oscillator",
            shape: "saw", // TODO: This property is actually named
                          // "type" in the Web Audio API. How will we
                          // define property aliases like this?
            inputs: {
                frequency: 440
            }
        },

        amplitude: {
            type: "signal.value",
            inputs: {
                value: 1.0
            }
        },

        ampEnv: {
            // In its first implementation, this signal
            // will wrap a GainNode and provide automation for
            // its gain AudioParam to perform the enveloping.
            //
            // Future implementations may include a generic,
            // AudioWorklet based gateable Envelope Generator signal.
            type: "signal.adsr",
            // These, of course, will have sensible defaults so
            // we won't have to explicitly define all properties.
            startLevel: 0.0,
            attackTime: 0.1,
            attackLevel: 1.0,
            decayTime: 0.1,
            sustainLevel: 0.8,
            releaseTime: 0.1,
            releaseLevel: 0.0,

            inputs: {
                "0": "{carrier}.outputs.0",
                gain: "{amplitude}.outputs.0"
            }
        }
    }
});
