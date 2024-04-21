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

// 외접하는 원 그리기 함수
function drawTangentCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.strokeStyle = 'blue';
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
}

// 캔버스 중앙 좌표 계산
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

// 하트 그리기
var heartSize  =100; // 하트 크기 조절 가능
drawHeart(centerX, centerY, heartSize);

// 하트에 외접하는 원 그리기
var circleRadius = heartSize; // 외접원의 반지름은 하트 크기의 절반
var circleRadius2 = heartSize*0.45; // 외접원의 반지름은 하트 크기의 절반
drawTangentCircle(centerX, centerY, circleRadius); // 하트 중앙에 위치한 점을 중심으로 원 그리기
drawTangentCircle(centerX, centerY + heartSize*0.425, circleRadius2); // 하트 중앙에 위치한 점을 중심으로 원 그리기

