(function(){
    var DR = __DestinyReddit__;

    if (DR.active()) {
        self.port.emit("ready", DR.sr);

        self.port.on("onStart", function(options) {
            DR.onStart(options);
        });
    }
})();
