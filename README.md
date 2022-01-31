# Signaletic

Signaletic is a small library for developing portable Web Audio-based sonification instruments. It is very inspired by [Flocking](http://flockingjs.org), but attempts to provide a minimalistic environment for declaratively instantiating and wiring native Web Audio nodes into signal-processing graphs and updating values on them.

The goal of this library is to provide a small core for developing an inclusive sonification toolkit that is usable across projects such as FLOE, PhET, Flocking, and others.

Signaletic is still in the design phase; we are taking a "documentation first" development approach, in which a series of real-world synthesis examples are notated in the Signaletic JSON format first. Next, unit tests will be developed for each example and then the Signaletic core library will be implemented.
