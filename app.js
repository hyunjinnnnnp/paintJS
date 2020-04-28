const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //context 캔버스의 픽셀을 다룰것임
//default
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700; //픽셀을 다루는 캔버스의 크기 지정
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = "2.5"; //초기화

let painting = false; //디폴트가 폴스

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY; //console!! 전체화면이랑 다름. 캔버스 안에서의 좌표만 받아올 것임

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
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //마우스 움직임 감지
  canvas.addEventListener("mousedown", startPainting); //클릭했을 때를 감지
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  //canvas.addEventListener("mouseenter", startPainting); 들어갈때마다 그려져서 실패
}

/*
while(canvas.addEventListener("mousedown", true){
    canvas.addEventListener("mouseenter", startPainting);
}
*/

//console.log(Array.from(colors)); //Array.from(objec) 오브젝트로부터 배열을만들어
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
