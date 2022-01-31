# Scheduled Source Gate

A signal that invokes <code>start()</code> and <code>stop()</code> on each of its inputs when its own <code>start()</code> and <code>stop()</code> methods are invoked.

## Example

    signal.define("my.gatedSynth", {
        type: "signal.signal", // TODO: Fix crazy naming!

        signals: {
            osc: {
                type: "signal.oscillator",
                shape: "sine",
                frequency: 120
            },

            env: {
                type: "signal.adsr",
                startLevel: 0.0,
                attackTime: 0.1,
                attackLevel: 1.0,
                decayTime: 0.1,
                sustainLevel: 0.8,
                releaseTime: 0.1,
                releaseLevel: 0.0
            },

            envGain: {
                type: "signal.gain"
            },

            gate: {
                type: "signal.sourceGate"
            }
        },

        inputs: [],
        params: {
            frequency: "{osc}.frequency"
        },
        outputs: ["{envGain}"],

        connections: {
            "{osc}.0": "{envGain}.0",
            "{env}": "{envGain}.gain",
            "{gate}": ["{osc}", "{env}"]
        }
    });

    var synth = my.gatedSynth();
    synth.gate.start(0);  // Open the gate immediately.
    synth.gate.stop(1.0); // Close the gate in a second.
