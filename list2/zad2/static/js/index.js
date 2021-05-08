const context = document.getElementById("canvas").getContext("2d")

const img = new Image();
img.src = "static/images/beach.jpg"
img.addEventListener('load', drawTiles, false)

const boardWidth = document.getElementById("canvas").width;
const boardHeight = document.getElementById("canvas").height;
const tileWidthCount = 2;
const tileHeightCount = 3;
const tileWidthSize = boardWidth / tileWidthCount;
const tileHeightSize = boardHeight / tileHeightCount;

let boardParts = {};

const clickLoc = {};
clickLoc.x = 0;
clickLoc.y = 0;

const emptyLoc = {};
emptyLoc.x = 0;
emptyLoc.y = 0;

let solved = false;

setBoard();

function setBoard() {
    boardParts = new Array(tileWidthCount);
    for (let i = 0; i < tileWidthCount; i++) {
        boardParts[i] = new Array(tileHeightCount);
        for (let j = 0; j < tileHeightCount; j++) {
            boardParts[i][j] = {};
            boardParts[i][j].x = (tileWidthCount - 1) - i;
            boardParts[i][j].y = (tileHeightCount - 1) - j;
        }
    }
    emptyLoc.x = boardParts[tileWidthCount - 1][tileHeightCount - 1].x;
    emptyLoc.y = boardParts[tileWidthCount - 1][tileHeightCount - 1].y;
    solved = false;
}

document.getElementById('canvas').onmousemove = function(e) {
    clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileWidthSize);
    clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileHeightSize);
};

document.getElementById('canvas').onclick = function() {
    if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) === 1) {
        slideTile(emptyLoc, clickLoc);
        drawTiles();
    }
    if (solved) {
        alert("You solved it!");
    }
};

function distance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function slideTile(toLoc, fromLoc) {
    if (!solved) {
        boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
        boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
        boardParts[fromLoc.x][fromLoc.y].x = tileWidthCount - 1;
        boardParts[fromLoc.x][fromLoc.y].y = tileHeightCount - 1;
        toLoc.x = fromLoc.x;
        toLoc.y = fromLoc.y;
        checkSolved();
    }
}

function checkSolved() {
    let flag = true;
    for (let i = 0; i < tileWidthCount; ++i) {
        for (let j = 0; j < tileHeightCount; ++j) {
            if (boardParts[i][j].x !== i || boardParts[i][j].y !== j) {
                flag = false;
            }
        }
    }
    solved = flag;
}

function drawTiles() {
    context.clearRect ( 0 , 0 , boardWidth , boardHeight);
    for (let i = 0; i < tileWidthCount; ++i) {
        for (let j = 0; j < tileHeightCount; ++j) {
            const x = boardParts[i][j].x;
            const y = boardParts[i][j].y;
            if(i !== emptyLoc.x || j !== emptyLoc.y || solved === true) {
                context.drawImage(img, x * tileWidthSize, y * tileHeightSize, tileWidthSize, tileHeightSize,
                    i * tileWidthSize, j * tileHeightSize, tileWidthSize, tileHeightSize);
            }
        }
    }
}
