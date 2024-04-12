var canvas = document.getElementById('drawbord');
var ctx = canvas.getContext('2d');

var blueSquareSize = 50; // 파란 사각형 크기
var redSquareSize = 50; // 빨간 사각형 크기
var yellowSquareSize = 30; // 노란 사각형 크기

var centerX = canvas.width / 2; // 캔버스 가로 중앙
var centerY = canvas.height / 2; // 캔버스 세로 중앙
var blueSquareAngle = 0; // 파란 사각형 회전 각도 초기화
var redSquareAngle = 0; // 빨간 사각형 회전 각도 초기화

var yellowSquareAngle = 0; // 노란 사각형 회전 각도 초기화

var yellowrevolutionAngle = 0; 
var revolutionAngle = 0; // 공전 각도 초기화
var revolutionRadius = 200; // 공전 반지름

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 지우기

  // 파란 사각형 그리기
  var blueSquareX = centerX + revolutionRadius * Math.cos(revolutionAngle) - (blueSquareSize / 2);
  var blueSquareY = centerY + revolutionRadius * Math.sin(revolutionAngle) - (blueSquareSize / 2);

  // 노란사각형 공전 궤도 계산
  var revolutionX = blueSquareX - 100 * Math.cos(yellowrevolutionAngle);
  var revolutionY = blueSquareY - 100 * Math.sin(yellowrevolutionAngle);

  //빨간 사각형 그리기
  ctx.save();
  ctx.translate(blueSquareX, blueSquareY);
  ctx.rotate(blueSquareAngle);
  ctx.fillStyle = 'blue';
  ctx.fillRect(-blueSquareSize / 2, -blueSquareSize / 2, blueSquareSize, blueSquareSize);
  ctx.restore();

  //노란 사각형 그리기
  ctx.save();
  ctx.translate(revolutionX, revolutionY);
  ctx.rotate(yellowSquareAngle);
  ctx.fillStyle = 'yellow';
  ctx.fillRect(-yellowSquareSize / 2, -yellowSquareSize / 2, yellowSquareSize, yellowSquareSize);
  ctx.restore();
  

  // 빨간 사각형 그리기
  var redSquareX = centerX - (redSquareSize / 2);
  var redSquareY = centerY - (redSquareSize / 2);

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(redSquareAngle);
  ctx.fillStyle = 'red';
  ctx.fillRect(-redSquareSize / 2, -redSquareSize / 2, redSquareSize, redSquareSize);
  ctx.restore();

  // 회전
  blueSquareAngle += Math.PI / 150; // 파란 사각형 회전
  redSquareAngle += Math.PI / 100; // 빨간 사각형 회전
  yellowSquareAngle += Math.PI / 80; // 노란 사각형 회전
  // 공전
  revolutionAngle -= Math.PI / 200;
  yellowrevolutionAngle += Math.PI / 100;

  requestAnimationFrame(draw); // 애니메이션 프레임 요청
}

draw(); // 그리기 함수 호출
