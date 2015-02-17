var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
    include: "*.reddit.com",
    contentScriptFile: [
        data.url("common/jquery-2.1.3.min.js"),
        data.url("common/URI.min.js"),
        data.url("common/destinyreddit.js"),
        data.url("page.js")
    ],
    contentScriptWhen: "start",
    onAttach: function(worker) {
        worker.port.on("ready", function(sr) {
            var options = {};
            if (sr === "fireteams") {
                options.css = data.load("common/fireteams.css");
            }
            worker.port.emit("onStart", options);
        });
    }
});
