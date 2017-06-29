# Signals

A signal is component that:

1. Has zero or more inputs
2. Has zero or more outputs
3. Holds a reference to one or more Web Audio Nodes or other Signals
4. Can route its inputs and outputs to those of its contained nodes

A signal may wrap a single Web Audio node, or it may be a composite for a subgraph of other signals.

## Defining a Signal

    signal.define("global.name", {
        type: "signal.signal", // TODO: Fix crazy naming!

        signals: {
            signalLocalName: {
                type: "global.name.of.signal",

                // TODO: Should this be more structured?
                <key corresponding to option, prop, or audioparam>: <value>
            }
        },

        connections: {
            "{<node name>}.<output number>": ["{<node name>}.<input number>"]
        },

        // A list of node inputs to expose as this signal's inputs.
        inputs: ["{<node name>}.<input number>"],

        // A list of node outputs to expose as this signal's outputs.
        outputs: ["{<node name>}.<output number>"],

        // A hash of node AudioParams to expose as this signal's parameters.
        parameters: {
            <param name>: "{<node name>}.<audio param name>"
        }
    });
