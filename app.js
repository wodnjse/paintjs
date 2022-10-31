const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // canvas안에서의 픽셀을 다룰 수 있게 함
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"  // "캔버스"의 기본 배경색
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);  // 배경이 transparent로 저장되는것 막아줌()
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    // 캔버스 안에서의 마우스 좌표
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

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.valueAsNumber;
    ctx.lineWidth = size;
}

/* 채우기(filling)모드인지 아닌지 확인 */
function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

/*
function onMouseUp(event) {  // 마우스를 땠을 때, 칠하기를 멈춤
    stopPainting();
}
*/

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

/**
 * 우클릭 방지
 * @param {*} event 
 * 
 */
function handleCM(event) {
    event.preventDefault()
}

/**
 * 이미지 다운로드
 * @see https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault
 */
function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");  // html a태그 생성
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach((color) =>
    color.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}