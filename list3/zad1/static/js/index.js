const menu = document.getElementById("menuList");

document.getElementById("ham").onclick = function () {
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
};

window.onresize = function () {
    if (window.innerWidth >= 600) {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
};
