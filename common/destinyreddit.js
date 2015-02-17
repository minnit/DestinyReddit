(function(){

    function isChrome() {
        return typeof chrome !== 'undefined';
    }

    function isFirefox() {
        return typeof self.on === 'function';
    }

    subredditMatch = /^https?:\/\/(?:[\-\w\.]+\.)?reddit\.com\/r\/([\w\.\+]+)/i;
    function currentSubreddit() {
        var match = location.href.match(subredditMatch);
        if (match !== null) {
            return match[1];
        }
        return "";
    }

    function addStyle(css) {
        var style = document.createElement('style');
        style.textContent = css;
        var head = document.getElementsByTagName('head')[0];
        if (head) {
            head.appendChild(style);
            return style;
        }
    }

    var sr = currentSubreddit().toLowerCase();

    function removeStyles() {
        var tgt = document.querySelector('link[title=applied_subreddit_stylesheet]');
        if (!tgt) tgt = this.head.querySelector('style[title=applied_subreddit_stylesheet]');
        if (!tgt) tgt = this.head.querySelector('style[data-apng-original-href]'); // apng extension fix (see #1076)
        if (tgt) {
            tgt.parentNode.removeChild(tgt);
        }
    }

    function onReady() {
        if (sr === "destinythegame") {
            [].forEach.call(document.querySelectorAll("p.title a.title"), function(item) {
                var title = item.innerHTML;
                title = title.replace(/\s*\[(?:question|guide|misc|media|discussion)\]\s*/gi, "");
                item.text = title;
            });
        }
    }

    function onStart(options) {
        if (sr === "destinythegame") {
            removeStyles();
        } else if (sr === "fireteams") {
            removeStyles();
        }

        if (options && options.css) {
            addStyle(options.css);
        }
    }

    if (isFirefox()) {
        self.port.emit("ready", sr);

        self.port.on("onStart", function(options) {
            onStart(options);
        });

        self.port.on("onReady", function(options) {
            onReady();
        });
    } else if (isChrome()) {
        if (sr === "fireteams") {
            var path = chrome.extension.getURL('data/fireteams.css');

            var xhr = new XMLHttpRequest();
            xhr.open('GET', path, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    var options = {};
                    options.css = xhr.responseText;
                    onStart(options);
                    onReady();
                }
            };
            xhr.send();
        } else {
            onStart({});
            onReady();
        }
    }
})();
