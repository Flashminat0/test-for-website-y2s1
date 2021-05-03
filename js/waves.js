(function () {
    var waveContainer = $('.waves-container');
    waveContainer.insertBefore(waveContainer.closest('.bloc .container'));
    "use strict";
    var cvs, ctx;
    var nodes = 3;
    var waves = [];
    var waveHeight = waveContainer.attr('data-wave-height');
    var colours = [waveContainer.attr('data-wave-back-color'), waveContainer.attr('data-wave-middle-color'), waveContainer.attr('data-wave-front-color')];

    function init() {
        cvs = document.getElementById("wave-canvas"), ctx = cvs.getContext("2d"), resizeCanvas(cvs);
        for (var e = 0; e < 3; e++) waves.push(new wave(colours[e], 1, nodes));
        update()
    }

    function update() {
        ctx.fillStyle = "", ctx.globalCompositeOperation = "source-over", ctx.fillRect(0, 0, cvs.width, cvs.height), ctx.clearRect(0, 0, cvs.width, cvs.height);
        for (var e = 0; e < waves.length; e++) {
            for (var t = 0; t < waves[e].nodes.length; t++) bounce(waves[e].nodes[t]);
            drawWave(waves[e])
        }
        ctx.fillStyle = "", requestAnimationFrame(update)
    }

    function wave(e, t, n) {
        this.colour = e, this.lambda = t, this.nodes = [];
        for (var o = 0; o <= n + 2; o++) {
            var c = [(o - 1) * cvs.width / n, 0, 200 * Math.random(), .3];
            this.nodes.push(c), console.log(c)
        }
        console.log(this.nodes)
    }

    function bounce(e) {
        e[1] = waveHeight / 2 * Math.sin(e[2] / 20) + cvs.height / 2, e[2] = e[2] + e[3]
    }

    function drawWave(e) {
        var t = function (e, t) {
            return (t - e) / 2 + e
        };
        ctx.fillStyle = e.colour, ctx.beginPath(), ctx.moveTo(0, cvs.height), ctx.lineTo(e.nodes[0][0], e.nodes[0][1]);
        for (var n = 0; n < e.nodes.length; n++) e.nodes[n + 1] ? ctx.quadraticCurveTo(e.nodes[n][0], e.nodes[n][1], t(e.nodes[n][0], e.nodes[n + 1][0]), t(e.nodes[n][1], e.nodes[n + 1][1])) : (ctx.lineTo(e.nodes[n][0], e.nodes[n][1]), ctx.lineTo(cvs.width, cvs.height));
        ctx.closePath(), ctx.fill()
    }

    function drawNodes(e) {
        ctx.strokeStyle = "#888";
        for (var t = 0; t < e.length; t++) ctx.beginPath(), ctx.arc(e[t][0], e[t][1], 4, 0, 2 * Math.PI), ctx.closePath(), ctx.stroke()
    }

    function drawLine(e) {
        ctx.strokeStyle = "#888";
        for (var t = 0; t < e.length; t++) e[t + 1] && ctx.lineTo(e[t + 1][0], e[t + 1][1]);
        ctx.stroke()
    }

    function resizeCanvas(e, t, n) {
        t && n ? (e.width = t, e.height = n) : (window.innerWidth > 1920 ? e.width = window.innerWidth : e.width = 1920, e.height = waveHeight)
    }

    document.addEventListener("DOMContentLoaded", init, !1);
})();