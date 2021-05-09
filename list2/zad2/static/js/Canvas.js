class Canvas {
    constructor(width, height, imgPath) {
        this.prepareGame(width, height, imgPath);
    }

    prepareGame(width, height, imgPath) {
        this.tileWidthCount = width;
        this.tileHeightCount = height;
        this.solved = false;
        this.setTileSize();
        this.setBoard();
        this.setImage(imgPath);
    }

    setImage(imgPath) {
        this.img = new Image();
        this.img.src = imgPath;
        this.img.addEventListener('load', function () { canvas.drawTiles(); }, false)
    }

    setTileSize() {
        this.boardWidth = document.getElementById("canvas").width;
        this.boardHeight = document.getElementById("canvas").height;
        this.tileWidthSize = this.boardWidth / this.tileWidthCount;
        this.tileHeightSize = this.boardHeight / this.tileHeightCount;
    }

    setBoard() {
        this.tiles = new Array(this.tileWidthCount);
        for (let i = 0; i < this.tileWidthCount; i++) {
            this.tiles[i] = new Array(this.tileHeightCount);
            for (let j = 0; j < this.tileHeightCount; j++) {
                const x = (this.tileWidthCount - 1) - i;
                const y = (this.tileHeightCount - 1) - j;
                this.tiles[i][j] = new Point(x, y);
            }
        }

        emptyTileLocation.x = this.tiles[this.tileWidthCount - 1][this.tileHeightCount - 1].x;
        emptyTileLocation.y = this.tiles[this.tileWidthCount - 1][this.tileHeightCount - 1].y;
    }

    slideTile(toLoc, fromLoc) {
        if (!this.solved) {
            this.tiles[toLoc.x][toLoc.y].x = this.tiles[fromLoc.x][fromLoc.y].x;
            this.tiles[toLoc.x][toLoc.y].y = this.tiles[fromLoc.x][fromLoc.y].y;
            this.tiles[fromLoc.x][fromLoc.y].x = this.tileWidthCount - 1;
            this.tiles[fromLoc.x][fromLoc.y].y = this.tileHeightCount - 1;
            toLoc.x = fromLoc.x;
            toLoc.y = fromLoc.y;
            this.checkEndGame();
        }
    }

    checkEndGame() {
        let flag = true;
        for (let i = 0; i < this.tileWidthCount; ++i) {
            for (let j = 0; j < this.tileHeightCount; ++j) {
                if (this.tiles[i][j].x !== i || this.tiles[i][j].y !== j) {
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
                this.drawTile(i, j, context);
            }
        }

        this.addBacklight(context);
    }

    drawTile(i, j, context) {
        const x = this.tiles[i][j].x;
        const y = this.tiles[i][j].y;
        if (i !== emptyTileLocation.x || j !== emptyTileLocation.y || this.solved === true) {
            context.drawImage(this.img,
                x * this.tileWidthSize, y * this.tileHeightSize,
                this.tileWidthSize, this.tileHeightSize,
                i * this.tileWidthSize, j * this.tileHeightSize,
                this.tileWidthSize, this.tileHeightSize);
        }
    }

    addBacklight(context) {
        if (distance(mouseLocation, emptyTileLocation) === 1 && this.solved === false) {
            context.strokeStyle = 'yellow';
            context.lineWidth = Math.min(this.tileWidthSize, this.tileHeightSize) * 0.05;
            context.strokeRect(mouseLocation.x * this.tileWidthSize, mouseLocation.y * this.tileHeightSize,
                this.tileWidthSize, this.tileHeightSize);
        }
    }
}
