function speak(lang, text, callback) {
    var u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = lang;
    u.rate = 0.8;

    u.onend = function () {
        if (callback) {
            callback();
        }
    };

    u.onerror = function (e) {
        if (callback) {
            callback(e);
        }
    };

    speechSynthesis.speak(u);
}