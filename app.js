const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");  // canvas안에서의 픽셀을 다룰 수 있게 함
const colors =  document.getElementsByClassName("jsColor");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {  // 캔버스 안에서의 마우스 좌표
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function handelColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

/*
function onMouseUp(event) {  // 마우스를 땠을 때, 칠하기를 멈춤
    stopPainting();
}
*/

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handelColorClick)
);