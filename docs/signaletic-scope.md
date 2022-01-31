# Scope of Signaletic

Signaletic aims to provide a declarative means to:

1. Define new [Signals](components/signals.md) that are composed of one or more other Signals, including:
    a. Connect signals
    a. The ability to map inputs, outputs, and parameters to a child Signal's inputs, outputs, or parameters
    b. Define a limited set of actions that should occur when a Signal's _properties_ are changed, such as to refresh and rebind a Buffer
2. Load or generate Buffers which draw from properties of the current AudioContext and properties of a Signal
3. Target changes (i.e. value changes, disconnections, addition of new nodes, reconnections) to a subgraph or properties of a Signal

## Issues

* Should it be possible to refer to Signals (by selector) contained within other Signals (i.e. not direct children), or should a Signal form the primary context for IoC-style references?
* How are references to Buffers handled? Is the entire Signal (consisting of Buffers, Signals, inputs, outputs, parameters and properties) flat?
