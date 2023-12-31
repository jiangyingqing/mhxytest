(function (doc, win) {
    var docEl = doc.documentElement, resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) {
                return
            }
            if (clientWidth >= 768) {
                docEl.style.fontSize = 100 * (clientWidth / 1920) + "px"
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + "px"
            }


        };
    if (!doc.addEventListener) {
        return
    }
    recalc();
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window)