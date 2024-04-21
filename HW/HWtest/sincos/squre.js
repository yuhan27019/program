// 캔버스 요소 가져오기
var canvas = document.getElementById('sincanvas');
var context = canvas.getContext('2d');

// 하트 그리기 함수
function drawHeart(x, y, size) {
    context.beginPath();
    context.moveTo(x, y);
    context.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
    context.bezierCurveTo(x - size, y + size / 4, x, y + size, x, y + size);
    context.bezierCurveTo(x, y + size, x + size, y + size / 4, x + size, y);
    context.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
}

// 내접하는 사각형 그리기 함수
function drawInscribedRectangle(x, y, size) {
    var diagonal = size * Math.sqrt(2); // 대각선 길이 계산

    // 왼쪽 위 좌표 계산
    var topLeftX = x - diagonal / 2;
    var topLeftY = y - diagonal / 2;

    // 사각형 그리기
    context.beginPath();
    context.rect(topLeftX, topLeftY, diagonal, diagonal);
    context.strokeStyle = 'green';
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
}

// 외접하는 사각형 그리기 함수
function drawCircumscribedRectangle(x, y, size) {
    // 사각형 중심 좌표
    var rectCenterX = x;
    var rectCenterY = y;

    // 외접하는 사각형 그리기
    context.beginPath();
    context.rect(rectCenterX - size / 2, rectCenterY - size / 2, size, size);
    context.strokeStyle = 'blue';
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
}

// 캔버스 중앙 좌표 계산
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

// 하트 그리기
var heartSize = 200; // 하트 크기 조절 가능
drawHeart(centerX, centerY, heartSize);

// 내접하는 사각형 그리기
drawInscribedRectangle(centerX, centerY + heartSize*0.35, heartSize/2);

// 외접하는 사각형 그리기
drawCircumscribedRectangle(centerX, centerY, heartSize*2);