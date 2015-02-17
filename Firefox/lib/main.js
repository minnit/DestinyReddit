var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
    include: "*.reddit.com",
    contentScriptFile: [
        data.url("destinyreddit.js")
    ],
    contentScriptWhen: "start",
    onAttach: function(worker) {
        worker.port.on("ready", function(sr) {
            var options = {};
            if (sr === "fireteams") {
                options.css = data.load("fireteams.css");
            }
            worker.port.emit("onStart", options);
        });
    }
});

pageMod.PageMod({
    include: "*.reddit.com",
    contentScriptFile: [
        data.url("destinyreddit.js")
    ],
    contentScriptWhen: "ready",
    onAttach: function(worker) {
        worker.port.on("ready", function(sr) {
            var options = {};
            worker.port.emit("onReady", options);
        });
    }
});

