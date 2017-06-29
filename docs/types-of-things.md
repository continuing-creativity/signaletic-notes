# Types of Things In The Signaletic Universe

## Web Audio API Nodes
* _Inputs_ are numbered inputs (0..n, specified by numberOfInputs) that may be connected to other AudioNodes, and which can have an arbitrary number of channels. Multiple connections to a given input will be summed by the browser.
* _AudioParams_ are named, modulatable parameters that may be specified by value, connected to an AudioNode, or both. If both a value and an AudioNode are specified, they are summed. AudioParams also do double duty as per-parameter schedulers, via the various <code>set...AtTime()</code> methods.
* _Properties_ are static or modifiable object properties that configure a Node (e.g. the <code>type</code> property of a <code>BiquadFilterNode</code>, which can be changed at any time to a different type of filter.)
* _Outputs_: numbered outputs (0..n, specified by numberOfOutputs) that may be connected to other AudioNodes, and which can have an arbitrary number of channels.

## Signals
Signals wrap Web Audio Nodes and allow for arbitrary composition of other Signals into "subgraphs" or "synths." They can be named and defined using the <code>signal.define()</code> function.

Signals can declare inputs, outputs, AudioParams, and propeties. In the case of the former three, however, they must always be mapped to an actual Node's inputs or AudioParams.

## Buffers
Buffers contain audio samples, curves, impulse responses, or other sequential data used by Nodes. In the Web Audio API, there are two types of buffers:

* _AudioBuffers_ are objects that wrap multi-channel raw buffers, and provide associated metadata such as the sample rate, length, and the number of channels. AudioBuffers are used when playing back audio samples with an <code>AudioBufferSourceNode</code> and when specifying impulse responses for the <code>ConvolverNode</code>.
* _"Raw"_ buffers are <code>Float32Array</code>s that convey sequential data such as <code>WaveShaperNode</code> curves, <code>PeriodicWave</code> real and imaginary data, and FFT frequency data.

