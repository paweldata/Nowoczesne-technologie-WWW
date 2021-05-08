document.getElementById("ham").onclick = function () {
    const menu = document.getElementById("menuList");
    if (menu.style.display === "block")
        menu.style.display = "none";
    else
        menu.style.display = "block";
}
