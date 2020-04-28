const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //context 캔버스의 픽셀을 다룰것임
//default
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;
const saveBtn = document.getElementById("jsSave");

ctx.fillStyle = "white"; //저장했을 때 투명배경이 아니게끔
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = "2.5"; //초기화

let painting = false; //디폴트가 폴스
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  //console!! 전체화면이랑 다름. 캔버스 안에서의 좌표만 받아올 것임

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// console.log(x, y);
//캔버스를 클릭했을 때 페인트하기 시작했으면 좋겠어

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    painting = true;
    mode.innerText = "Fill"; //한번 칠한 후에 다시 그리기모드로 변경
    filling = false;
  }
}

function handleCM(event) {
  event.preventDefault();
} //우클릭방지

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[😎]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  //canvas.addEventListener("mouseenter", startPainting); 들어갈때마다 그려져서 실패
  //캔버스 밖으로 나갔다가들어오면 선이 끊기는 이유...
  //clientX,Y 클릭한 상태로 들어오면 선이 이어지게 할 수 있나?
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

//console.log(Array.from(colors)); //Array.from(objec) 오브젝트로부터 배열을만들어
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick); //모드 버튼이클릭됐을 때 제어하는 구문
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
