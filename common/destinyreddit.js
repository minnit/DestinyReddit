var __DestinyReddit__ = {};

(function(){

    var DR = __DestinyReddit__;

    function isChrome() {
        return typeof chrome !== 'undefined';
    }

    function isFirefox() {
        return typeof self.on === 'function';
    }

    subredditMatch = /^https?:\/\/(?:[\-\w\.]+\.)?reddit\.com\/r\/([\w\.\+]+)/i;
    DR.currentSubreddit = function() {
        var match = location.href.match(subredditMatch);
        if (match !== null) {
            return match[1];
        }
        return "";
    }

    DR.addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        var head = document.getElementsByTagName('head')[0];
        if (head) {
            head.appendChild(style);
            return style;
        }
    }

    var sr = DR.currentSubreddit().toLowerCase();
    DR.sr = sr;

    var uri = new URI();
    DR.uri = uri;

    DR.active = function() {
        var dr = uri.search(true).dr;
        if (! dr) {
            return true;
        }
        if (dr === "false") {
            return false
        }
        return true;
    }

    DR.removeStyles = function() {
        var tgt = document.querySelector('link[title=applied_subreddit_stylesheet]');
        if (!tgt) tgt = this.head.querySelector('style[title=applied_subreddit_stylesheet]');
        if (!tgt) tgt = this.head.querySelector('style[data-apng-original-href]'); // apng extension fix (see #1076)
        if (tgt) {
            tgt.parentNode.removeChild(tgt);
        }
    }

    DR.onReady = function() {
        if (sr === "destinythegame") {
            [].forEach.call(document.querySelectorAll("p.title a.title"), function(item) {
                var title = item.innerHTML;
                // Here is the tag list:
                // https://www.reddit.com/r/DestinyTheGame/wiki/rules#wiki_10._all_posts_must_include_a_required_tag
                title = title.replace(/\s*\[(?:discussion|question|guide|lore|media|suggestion|misc|news)\]\s*/gi, "");
                item.text = title;
            });
        }
    }

    DR.onStart = function(options) {
        if (sr === "destinythegame") {
            DR.removeStyles();
        } else if (sr === "fireteams") {
            DR.removeStyles();
        }

        if (options && options.css) {
            DR.addStyle(options.css);
        }

        $(document).ready(function(){
            DR.onReady();
        });
    }
})();
