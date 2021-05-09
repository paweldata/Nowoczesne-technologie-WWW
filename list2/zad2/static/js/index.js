let canvas;
const mouseLocation = new Point(0, 0);
const emptyTileLocation = new Point(0, 0);

window.onload = function () {
    canvas = new Canvas(4, 4, "static/images/beach.jpg");

    document.getElementById('canvas').onmousemove = function(e) {
        mouseLocation.x = Math.floor((e.pageX - this.offsetLeft) / canvas.tileWidthSize);
        mouseLocation.y = Math.floor((e.pageY - this.offsetTop) / canvas.tileHeightSize);
    };

    document.getElementById('canvas').onclick = function() {
        function distance(x1, y1, x2, y2) {
            return Math.abs(x1 - x2) + Math.abs(y1 - y2);
        }
        if (distance(mouseLocation.x, mouseLocation.y, emptyTileLocation.x, emptyTileLocation.y) === 1) {
            canvas.slideTile(emptyTileLocation, mouseLocation);
            canvas.drawTiles();
        }
        if (canvas.solved) {
            alert("Wygrałeś!");
        }
    };
}

function restartGame() {
    let newWidthCount = parseInt(document.getElementById("widthCount").value);
    let newHeightCount = parseInt(document.getElementById("heightCount").value);
    if (newWidthCount > 0 && newHeightCount > 0) {
        canvas.prepareGame(newWidthCount, newHeightCount, "static/images/beach.jpg");
    }
}
