class Canvas {
    constructor(width, height, imgPath) {
        this.prepareGame(width, height, imgPath);
    }

    prepareGame(width, height, imgPath) {
        this.tileWidthCount = width;
        this.tileHeightCount = height;
        console.log("In constructor " + this.tileHeightCount);
        this.solved = false;
        this.setTileSize();
        this.setBoard();
        this.setImage(imgPath);
    }

    setImage(imgPath) {
        this.img = new Image();
        this.img.src = imgPath;
        this.img.addEventListener('load', function () {
            canvas.drawTiles();
        }, false)
    }

    setTileSize() {
        this.boardWidth = document.getElementById("canvas").width;
        this.boardHeight = document.getElementById("canvas").height;
        this.tileWidthSize = this.boardWidth / this.tileWidthCount;
        this.tileHeightSize = this.boardHeight / this.tileHeightCount;
    }

    setBoard() {
        this.boardParts = new Array(this.tileWidthCount);
        for (let i = 0; i < this.tileWidthCount; i++) {
            this.boardParts[i] = new Array(this.tileHeightCount);
            for (let j = 0; j < this.tileHeightCount; j++) {
                this.boardParts[i][j] = {};
                this.boardParts[i][j].x = (this.tileWidthCount - 1) - i;
                this.boardParts[i][j].y = (this.tileHeightCount - 1) - j;
            }
        }
        emptyTileLocation.x = this.boardParts[this.tileWidthCount - 1][this.tileHeightCount - 1].x;
        emptyTileLocation.y = this.boardParts[this.tileWidthCount - 1][this.tileHeightCount - 1].y;
        this.solved = false;
    }

    slideTile(toLoc, fromLoc) {
        if (!this.solved) {
            this.boardParts[toLoc.x][toLoc.y].x = this.boardParts[fromLoc.x][fromLoc.y].x;
            this.boardParts[toLoc.x][toLoc.y].y = this.boardParts[fromLoc.x][fromLoc.y].y;
            this.boardParts[fromLoc.x][fromLoc.y].x = this.tileWidthCount - 1;
            this.boardParts[fromLoc.x][fromLoc.y].y = this.tileHeightCount - 1;
            toLoc.x = fromLoc.x;
            toLoc.y = fromLoc.y;
            this.checkSolved();
        }
    }

    checkSolved() {
        let flag = true;
        for (let i = 0; i < this.tileWidthCount; ++i) {
            for (let j = 0; j < this.tileHeightCount; ++j) {
                if (this.boardParts[i][j].x !== i || this.boardParts[i][j].y !== j) {
                    flag = false;
                }
            }
        }
        this.solved = flag;
    }

    drawTiles() {
        const context = document.getElementById("canvas").getContext("2d");

        context.clearRect ( 0 , 0 , this.boardWidth , this.boardHeight);
        for (let i = 0; i < this.tileWidthCount; ++i) {
            for (let j = 0; j < this.tileHeightCount; ++j) {
                const x = this.boardParts[i][j].x;
                const y = this.boardParts[i][j].y;
                if(i !== emptyTileLocation.x || j !== emptyTileLocation.y || this.solved === true) {
                    context.drawImage(this.img,
                        x * this.tileWidthSize, y * this.tileHeightSize,
                        this.tileWidthSize, this.tileHeightSize,
                        i * this.tileWidthSize, j * this.tileHeightSize,
                        this.tileWidthSize, this.tileHeightSize);
                }
            }
        }
    }
}
