const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "##2c2c2c";
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
}

function onMouseDown(event) {  // 마우스를 클릭하면 칠하기 동작
    painting = true;
}

function onMouseUp(event) {  // 마우스를 땠을 때, 칠하기를 멈춤
    stopPainting();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}