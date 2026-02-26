const dialogContent = document.getElementById("dialog-content");
const dialogContentZ = document.getElementById("dialog-contentz");
const dialogContentMove = document.getElementById("dialog-image");

let scale = 0.9;
let offsetX, offsetY;
let MountoffsetX, MountoffsetY;
function resetsize() {
    offsetY = 0;
    offsetX = 0;
    MountoffsetX = 0;
    MountoffsetY = 0;
    scale = 0.9;

}



function openDialog(src) {
    resetsize();
    console.log("openDialog(src)");
    dialogContent.style.transform = `scale(0.9)`;

    const img = document.getElementById("dialog-image");
    img.src = src;

 
    document.querySelector(".dialog-overlay").style.display = "block";
    dialogContentZ.addEventListener("mousewheel", zoom);
    dialogContentMove.addEventListener("mousedown", startDrag);
    dialogContentZ.addEventListener("mousedown", startDrag);
}

function closeDialog() {
    document.querySelector(".dialog-overlay").style.display = "none";
    dialogContent.style.top = 0;
    dialogContent.style.left = 0;
    dialogContent.style.transform = "";
}

let sizeimgW, sizeimgH;
function zoom(event) {
    event.preventDefault();
    if (event.deltaY > 0) {
        // Scroll down, zoom out
        if (scale > 2) {
            scale = Math.max(0.001, scale - 0.3);
        } else if (scale > 1) {
            scale = Math.max(0.001, scale - 0.5);
        } else {
            scale = Math.max(0.001, scale - 0.1);
        }
    } else {
        // Scroll up, zoom in
        if (scale > 2) {
            scale = Math.min(20, scale + 1);
        } else if (scale > 1) {
            scale = Math.min(20, scale + 0.5);
        } else {
            scale = Math.min(20, scale + 0.1);
        }
    }

    dialogContent.style.transform = `scale(${scale})`;

    const img = document.getElementById("dialog-image");
    const elementToAnimate = document.getElementById("zoom-show");

    // Add the 'show' class to trigger the transition
    elementToAnimate.classList.add("show");

    // Remove the 'show' class after 3 seconds
    setTimeout(() => {
        elementToAnimate.classList.remove("show");
    }, 3000); // 3 seconds

    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    const rect = img.getBoundingClientRect(); // Assuming 'element' is the element you want to get the size from
    const percentage = (rect.width / naturalHeight) * 100;
    const cal = (scale - 1) * 100 / 1
    // (เงินเดือนใหม่ - เงินเดือนเก่า) x 100 ÷ เงินเดือนเก่า = เปอร์เซ็นต์เงินเดือนที่เพิ่มขึ้น
    // document.getElementById('zoom-sizeimage').innerText = percen.toString("#,###") + '%';
    const zoomSizeElement = document.getElementById("zoom-sizeimage");
    // zoomSizeElement.innerText = percentage.toLocaleString(undefined, { maximumFractionDigits: 2 }) + "%";
    // zoomSizeElement.innerText = cal + "%";
}

function startDrag(event) {
    MountoffsetX = event.clientX;
    MountoffsetY = event.clientY;
    event.preventDefault();
    const inlineStyle = dialogContent.style.cssText;
    const leftValue = getPropertyValue(inlineStyle, "left");
    const topValue = getPropertyValue(inlineStyle, "top");
    offsetX = leftValue;
    offsetY = topValue;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", endDrag);
}

function drag(event) {
    event.preventDefault();
    const MoveX = MountoffsetX - event.clientX;
    const Movey = MountoffsetY - event.clientY;
    let x = offsetX - MoveX;
    let y = offsetY - Movey * 2;
    dialogContent.style.left = x + "px";
    dialogContent.style.top = y + "px";
}

function getPropertyValue(style, property) {
    const regex = new RegExp(property + ":\\s*(-?\\d+\\.?\\d*)px");
    const match = style.match(regex);
    if (match) {
        return parseFloat(match[1]);
    }
    return null;
}

function endDrag() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", endDrag);
}
