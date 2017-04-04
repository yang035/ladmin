/**
 * Created by Administrator on 2016/9/21.
 */
/*html{font-size:100px;}必写  此时1rem = 100px，宽55px，高37px的元素样式  width: 0.55rem; height: 0.37rem;
 (clientWidth / 750)  大小随页面宽度改变
 */
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
