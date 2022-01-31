# Signaletic Design Considerations

## Requirements
 * Support for modular synthesis-style signal processing graphs, which are composed of low-level signal units (Nodes, in Web Audio terminology). (_define modular-style_)
     * This should include signal processing primitives that are missing, implicit, or inconvenient in the Web Audio API, such as envelopes, value nodes, common mathematical operators, etc.
 * The ability to specify graphs of Web Audio API nodes declaratively (i.e. without requiring repetitive, imperative code to instantiate or connect nodes)
 * Signal graphs should be authorable using visual and textual tools so that non-programmers can design sonification instruments
 * Signal graph specifications should be easy to serialize, interpret, and modify as data structures using standard tools (i.e. JSON)
 * It should be possible to export signal graphs created in a sonification authoring tool or editing environment into a format that can be easily instantiated in a "player" environment
 * Should support the creation of separate, higher level tooling that supports personalization and user authoring environments in which "end users" can customize or change a sonification's instrumental characteristics and mappings to data
 * Minimal dependence on third party frameworks/libraries, where such minimalism doesn't end up leading towards the creation of ad hoc or implicit framework functionality
 * Can be viably integrated into larger frameworks or higher-level abstractions such as Flocking and Infusion
 * The ability to change live signal graphs declaratively by address (i.e. by targeting signal specification data structures at named paths) such as:
    * inserting new nodes into the graph
    * removing nodes
    * replacing one node with another
    * updating audio parameter values
 * The ability to define custom-typed nodes that are implemented using JavaScript-based signal processors (via the current ScriptProcessorNode API and eventually the AudioWorklet API when it is implemented)
    * This should include, for example, the ability for Flocking to implement its own custom "flocking" type node
 * Built-in, sensible defaults for all (or as many as is conceivably possible) node parameters and input values, such that nodes can be easily used in an "always live" authoring or playback environment. Users should only need to define their own "diffs," which will be merged in by the framework
 * The ability to define shared audio buffers that can be loaded from a URL or generated from a set of built-in function generators
 * Where appropriate, normalization of Node parameters to signal ranges (e.g. 0-1.0 for AudioBufferSourceNode's loopEnd param) to make these values more easily modulatable and reduce repetitive manual calculation code.
