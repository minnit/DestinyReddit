(function(){

    var DR = __DestinyReddit__;

    var options = {};
    if (DR.sr === "fireteams") {
        var path = chrome.extension.getURL('data/common/fireteams.css');

        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                options.css = xhr.responseText;
                DR.onStart(options);
            }
        };
        xhr.send();
    } else {
        DR.onStart(options);
    }

})();
