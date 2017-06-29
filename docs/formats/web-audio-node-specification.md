# Web Audio Node Signals
Signaletic provdes wrappers for all native Web Audio Nodes. These wrappers are necessary in order to provide the ability to:
 * seamlessly connect Nodes to other kinds of Signals
 * declare and use web audio nodes in composable graphs

## Example 1: Wrapping a ConstantSourceNode

    signal.define("signal.value", {
        type: "signal.signal",

        signals: {
            constant: {
                // This Signal will have to be implemented "in code."
                type: "signal.webAudioNode",
                options: {
                    nodeType: "ConstantSourceNode"
                }
            }
        },

        inputs: "{constant}",
        outputs: "{constant}",
        parameters: {
            value: "{constant}.offset"
        }

        // TODO: What about exposing properties of contained signals?
    });

## Example 2: A Multiplier
    signal.define("signal.mul", {
        type: "signal.signal",

        signals: {
            gain: {
                type: "signal.webAudioNode",
                options: {
                    nodeType: "GainNode"
                }
            }
        },

        inputs: "{gain}",
        outputs: "{gain}",
        parameters: {
            scale: "{gain}.gain"
        }
    });
