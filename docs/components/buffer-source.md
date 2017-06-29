# Buffer Sources

A buffer source is a component that produces an AudioBuffer by some means. For example, loading it from a URL via XHR or a data URL, or generating it by invoking a function that produces particular patterns of samples.

Buffer Sources may be either synchronous or asynchronous; they implement a Promise-based interface. The primary method of a BufferSource is <code>get()</code>, which will return a promise that resolves when the AudioBuffer has been loaded and parsed, or rejected if the request fails.

## XHR Buffer Source Example

    var urlBufferSource = signal.buffer.urlSource({
        url: "audio/kick-drum.mp3"
    });

    var promise = urlBufferSource.get();

    promise.then(function (audioBuffer) {
        // Success!
    }, function (error) {
        console.error("Got bufferSource error response of ", error);
    });

