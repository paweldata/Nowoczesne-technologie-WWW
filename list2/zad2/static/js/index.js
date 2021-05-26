let canvas;
let gallery;
const mouseLocation = new Point(0, 0);
const emptyTileLocation = new Point(0, 0);

function distance(point1, point2) {
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}

window.onload = function () {
    gallery = new Gallery();
    canvas = new Canvas(4, 4, gallery.getImagePath());

    document.getElementById('canvas').onmousemove = function(e) {
        mouseLocation.x = Math.floor((e.pageX - this.offsetLeft) / canvas.tileWidthSize);
        mouseLocation.y = Math.floor((e.pageY - this.offsetTop) / canvas.tileHeightSize);
        canvas.drawTiles();
    };

    document.getElementById('canvas').onclick = function() {
        if (canvas.solved) {
            canvas.prepareGame(canvas.tileWidthCount, canvas.tileHeightCount, gallery.getImagePath());
        }
        if (distance(mouseLocation, emptyTileLocation) === 1) {
            canvas.slideTile(emptyTileLocation, mouseLocation);
            canvas.drawTiles();
        }
        if (canvas.solved) {
            alert("Wygrałeś!");
        }
    };

    document.getElementById("imagesList").onclick = function (e) {
        gallery.imgId = e.target.id;
        document.getElementById("chosenImage").src = e.target.src;
    }
}

function restartGame() {
    let newWidthCount = parseInt(document.getElementById("widthCount").value);
    let newHeightCount = parseInt(document.getElementById("heightCount").value);
    if (newWidthCount > 1 && newHeightCount > 1) {
        canvas.prepareGame(newWidthCount, newHeightCount, gallery.getImagePath());
    }
}
