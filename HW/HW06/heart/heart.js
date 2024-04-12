var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


// 하트 그리기 함수
function drawHeart(x, y, size, color, rotation) {
  ctx.save(); // 현재 그리기 상태 저장
  ctx.translate(x, y); // 좌표 이동
  ctx.rotate(rotation); // 회전
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -size / 2, -size, -size / 2, -size, 0);
  ctx.bezierCurveTo(-size, size / 4, 0, size, 0, size);
  ctx.bezierCurveTo(0, size, size, size / 4, size, 0);
  ctx.bezierCurveTo(size, -size / 2, 0, -size / 2, 0, 0);
  ctx.fillStyle = color; // 하트의 색상을 지정합니다. 랜덤으로 선택된 색상으로 변경됩니다.
  ctx.fill();
  ctx.restore(); // 이전 그리기 상태 복원
}



// 캔버스 중앙 좌표 계산
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

// 하트를 그리기 위한 크기 범위 지정
var minHeartSize = 20;
var maxHeartSize = 40;

// 색상 배열 정의
var colors = ['#FF1493', '#FF69B4', '#FFC0CB', '#FFA07A']; // 분홍 계열의 색상

// 하트 객체 생성자 함수
function HeartObject(x, y, size, color, speedX, speedY, rotationSpeed) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;
  this.speedX = speedX;
  this.speedY = speedY;
  this.rotationSpeed = rotationSpeed; // 회전 속도
  this.rotation = 0; // 초기 회전 각도
}

// 하트들을 담을 배열 생성
var array = []; 

// 0.2초마다 하트 생성
setInterval(function() {
    canvas.dispatchEvent(new MouseEvent('mousemove'));
  }, 200);

// 마우스 이벤트 처리
canvas.addEventListener('mousemove', function(event) {
  // 캔버스의 경계 사각형 정보 가져오기
  var rect = canvas.getBoundingClientRect();
  
  // 마우스 커서 위치 계산
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;
  
  // 캔버스 바깥에서 마우스 이벤트가 발생한 경우 무시
  if (mouseX < 0 || mouseX > canvas.width || mouseY < 0 || mouseY > canvas.height) {
    return;
  }
  
  // 현재 캔버스에 있는 하트의 수 계산
  var currentHeartCount = array.length;

  // 남은 하트의 수 계산
  var remainingHeartCount = 100 - currentHeartCount;

  // 남은 하트의 수와 한 번에 생성할 하트의 수 중 작은 값 선택
  var numHearts = Math.min(Math.floor(Math.random() * 5) + 1, remainingHeartCount);

  for (var i = 0; i < numHearts; i++) {
    // 랜덤한 위치, 크기, 색상, 속도로 하트 생성
    var randomSize = Math.floor(Math.random() * (maxHeartSize - minHeartSize + 1)) + minHeartSize;
    var randomX = mouseX + (Math.random() - 0.5) * 100; // 마우스 위치에서 좌우로 최대 100px 범위 내에서 랜덤한 위치 설정
    var randomY = mouseY + (Math.random() - 0.5) * 100; // 마우스 위치에서 상하로 최대 100px 범위 내에서 랜덤한 위치 설정
    var randomColor = colors[Math.floor(Math.random() * colors.length)]; // 색상 배열에서 랜덤으로 색상 선택
    var randomSpeedX = (Math.random() - 0.5) * 2; // -1 ~ 1 범위의 랜덤한 속도
    var randomSpeedY = (Math.random() - 0.5) * 2; // -1 ~ 1 범위의 랜덤한 속도
    var randomRotationSpeed = (Math.random() - 0.5) * 0.02; // 랜덤한 회전 속도 (-0.01에서 0.01 사이)
    array.push(new HeartObject(randomX, randomY, randomSize, randomColor, randomSpeedX, randomSpeedY, randomRotationSpeed));
  }
});

// 캔버스를 초기화하고 새로운 프레임을 그리는 함수
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 지우고
  for (var i = 0; i < array.length; i++) {
    var heart = array[i];
    heart.x += heart.speedX; // x 좌표 이동
    heart.y += heart.speedY; // y 좌표 이동
    heart.rotation += heart.rotationSpeed; // 회전 각도 변경


    if (heart.x < 0 || heart.x > canvas.width || heart.y < 0 || heart.y > canvas.height) {
      // 캔버스 바깥으로 나가면 해당 하트 제거
      array.splice(i, 1);
      i--; // splice로 배열이 변하므로 인덱스 보정
      continue; // 다음 하트로 이동
    }
    drawHeart(heart.x, heart.y, heart.size, heart.color, heart.rotation); // 하트 그리기
  }
  requestAnimationFrame(draw); // 다음 프레임을 그리기 위해 반복
}

// 초기 프레임 그리기
draw();
