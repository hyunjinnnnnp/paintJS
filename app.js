const canvas = document.getElementById("jsCanvas");

let painting = false; //디폴트가 폴스

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY; //console!! 전체화면이랑 다름. 캔버스 안에서의 좌표만 받아올 것임
}
// console.log(x, y);

//캔버스를 클릭했을 때 페인트하기 시작했으면 좋겠어

function onMouseDown(event) {
  //console.log(event);
  painting = true;
}

function onMouseUp(event) {
  //painting = false;
  stopPainting();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //마우스 움직임 감지
  canvas.addEventListener("mousedown", onMouseDown); //클릭했을 때를 감지
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
}
