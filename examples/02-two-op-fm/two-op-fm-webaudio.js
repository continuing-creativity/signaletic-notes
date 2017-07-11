/*global ConstantSourceNode, EnvGen*/

"use strict";

/*
Here, we are assuming that:
   * Nodes such as ConstantSourceNode have been implemented or polyfilled
   * Crucial signals such as EnvGen have been implemented
   * Other "semantic" Nodes such as Value, Mul, Add, etc. are not present
*/

var ac = new (window.AudioContext || window.webkitAudioContext)();

var frequency = new ConstantSourceNode(ac, {
    offset: 440
});

var amplitude = new ConstantSourceNode(ac, {
    offset: 1.0
});

var ratio = new ConstantSourceNode(ac, {
    offset: 2
});

var index = new ConstantSourceNode(ac, {
    offset: 5
});

var noteGate = new ConstantSourceNode(ac, {
    offset: 0.0
});

// How will we implement this?
// Using the current Web Audio API with only native nodes,
// it will need to live on the "client" side, and thus can't be triggered
// by an audio signal. So either we inefficiently implement Flocking-style
// envelopes as ScriptProcessorNodes, or can't support "control voltage"-style
// triggering of envelopes. Either seems workable for the (hopefully short)
// interim period until AudioWorklets have been implemented.
var envelope = new EnvGen({
    levels: [0, 1, 0.75, 0.6, 0],
    times: [0.1, 0.1, 0.3, 0.1],
    sustainPoint: 2
});

var modulatorFrequency = new GainNode(ac);

var deviation = new GainNode(ac);

var modulatorAmplitudeGain = new GainNode(ac);

var modulator = new OscillatorNode(ac, {
    type: "sine"
});

var modulatorOutputGain = new GainNode(ac);

var carrier = new OscillatorNode(ac, {
    type: "sine"
});

var envelopeGain = new GainNode(ac);

var outputGain = new GainNode(ac);

noteGate.connect(envelope.gate, 0);

frequency.connect(modulatorFrequency, 0, 0);
ratio.connect(modulatorFrequency.gain, 0);

modulatorFrequency.connect(deviation, 0, 0);
index.connect(deviation.gain, 0);

envelope.connect(modulatorAmplitudeGain, 0, 0);
deviation.connect(modulatorAmplitudeGain.gain, 0);

modulatorFrequency.connect(modulator.frequency, 0);

modulator.connect(modulatorOutputGain, 0, 0);
modulatorAmplitudeGain.connect(modulatorOutputGain.gain, 0);

modulatorOutputGain.connect(carrier.frequency, 0);
frequency.connect(carrier.frequency, 0);

envelope.connect(envelopeGain, 0, 0);
amplitude.connect(envelopeGain.gain, 0);

envelopeGain.connect(outputGain.gain, 0);
carrier.connect(outputGain, 0, 0);
