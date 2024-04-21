// 캔버스 요소 가져오기
var canvas = document.getElementById("sincanvas");
var ctx = canvas.getContext("2d");

var bluex = 50; // 사각형의 x 좌표
var bluey = 50; // 사각형의 y 좌표
var redx = canvas.width / 2 - 100;
var redy = 50; 
var dx = 4; // x 방향으로의 이동 속도
var dy = 4;

// 두 사각형이 겹치는지 여부를 확인하는 함수
function checkOverlap() {
    // 파란 사각형의 좌표와 크기
    var blueRect = {
        x: bluex,
        y: bluey,
        width: 300,
        height: 300
    };

    // 빨간 사각형의 좌표와 크기
    var redRect = {
        x: redx,
        y: redy,
        width: 300,
        height: 300
    };

    var overlapX = Math.max(blueRect.x, redRect.x);
            var overlapY = Math.max(blueRect.y, redRect.y);
            var overlapWidth = Math.min(blueRect.x + blueRect.width, redRect.x + redRect.width) - overlapX;
            var overlapHeight = Math.min(blueRect.y + blueRect.height, redRect.y + redRect.height) - overlapY;

            var overlapArea = overlapWidth * overlapHeight;

            if (overlapWidth > 0 && overlapHeight > 0) {
                document.getElementById("overlapMessage").textContent = "사각형이 겹칩니다! 겹친 영역의 넓이는 " + overlapArea + "입니다.";
                document.getElementById("overlapMessage").style.display = "block";
            } else {
                document.getElementById("overlapMessage").textContent = "";
                document.getElementById("overlapMessage").style.display = "none";
            }
}

function drawRectangle() {
    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 사각형 그리기
    ctx.fillStyle = "blue";
    ctx.fillRect(bluex, bluey, 300, 300);

    // x 좌표 업데이트
    bluex += dx;

    // 캔버스 끝에 닿으면 반대 방향으로 이동
    if (bluex + 200 > canvas.width || bluex < 0) {
        dx = -dx;
    }

    // 사각형 그리기
    ctx.fillStyle = "red";
    ctx.fillRect(redx, redy, 300, 300);

    // y 좌표 업데이트
    redy += dy;

    // 캔버스 가장자리에 닿으면 반대 방향으로 이동
    if (redy + 200 > canvas.height || redy < 0) {
        dy = -dy;
    }

    // 두 사각형이 겹치는지 확인
    checkOverlap();

    // 다음 프레임 요청
    requestAnimationFrame(drawRectangle);
}

// 반복적으로 사각형을 그리기 위해 함수 호출
drawRectangle();
