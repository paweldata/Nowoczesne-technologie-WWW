class Gallery {
    constructor() {
        this.imgId = 0;
    }

    getImagePath() {
        return Gallery.imagesPaths[this.imgId];
    }
}

Gallery.imagesPaths = [
    "static/images/beach.jpg",
    "static/images/butterfly.jpg",
    "static/images/car-race.jpg",
    "static/images/coffee-milk.jpg",
    "static/images/desserts.jpg",
    "static/images/fox.jpg",
    "static/images/girl.jpg",
    "static/images/kitten.jpg",
    "static/images/paris.jpg",
    "static/images/pizza.jpg",
    "static/images/salmon.jpg",
    "static/images/sunset.jpg",
];
