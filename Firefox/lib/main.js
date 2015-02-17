var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
    include: "*.reddit.com",
    contentScriptFile: [
        data.url("jquery-2.1.3.min.js"),
        data.url("URI.min.js"),
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
