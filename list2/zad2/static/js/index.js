let canvas;
const mouseLocation = new Point(0, 0);
const emptyTileLocation = new Point(0, 0);

function distance(point1, point2) {
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}

window.onload = function () {
    canvas = new Canvas(4, 4, "static/images/beach.jpg");

    document.getElementById('canvas').onmousemove = function(e) {
        mouseLocation.x = Math.floor((e.pageX - this.offsetLeft) / canvas.tileWidthSize);
        mouseLocation.y = Math.floor((e.pageY - this.offsetTop) / canvas.tileHeightSize);
        canvas.drawTiles();
    };

    document.getElementById('canvas').onclick = function() {
        if (canvas.solved) {
            canvas.prepareGame(canvas.tileWidthCount, canvas.tileHeightCount, "static/images/beach.jpg");
        }
        if (distance(mouseLocation, emptyTileLocation) === 1) {
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
