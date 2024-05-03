var canvas = document.getElementById('testcanvas');
var ctx = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

// 사각형의 너비와 높이
var rectWidth = 100;
var rectHeight = 50;

// 사각형의 위치 계산
var rectX = (canvasWidth - rectWidth) / 2; // 캔버스 가로 중앙
var rectY = canvasHeight - rectHeight - 100; // 캔버스 아래

// 캔버스에 사각형 그리기
ctx.fillStyle = 'rgb(208,206,206)'; // 채우기 색 설정
ctx.fillRect(rectX, rectY, rectWidth, rectHeight); // (x, y, width, height) 좌표와 크기 설정
ctx.strokeStyle = 'black'; // 윤곽선 색상 설정
ctx.lineWidth = 2; // 윤곽선 두께 설정
ctx.strokeRect(rectX, rectY, rectWidth, rectHeight); // 사각형 윤곽선 그리

// 사각형 내부에 텍스트 추가
ctx.fillStyle = 'white'; // 텍스트 색상 설정
ctx.font = '20px Arial'; // 텍스트 크기 및 글꼴 설정
var text = '시작';
var textX = rectX + (rectWidth - ctx.measureText(text).width) / 2; // 텍스트의 x 좌표 계산
var textY = rectY + rectHeight / 2; // 텍스트의 y 좌표 계산
ctx.fillText(text, textX, textY); // 텍스트 그리기

// "뱀파이어 서바이벌" 텍스트 추가
var titleText = '뱀파이어 서바이벌'; // 타이틀 텍스트
ctx.fillStyle = 'black'; // 타이틀 텍스트 색상 설정
ctx.font = 'italic 30px Arial'; // 타이틀 텍스트 크기 및 글꼴 설정
var titleTextX = (canvasWidth - ctx.measureText(titleText).width) / 2; // 타이틀 텍스트의 x 좌표 계산
var titleTextY = canvasHeight / 2 - 160; // 타이틀 텍스트의 y 좌표 계산
ctx.fillText(titleText, titleTextX, titleTextY); // 타이틀 텍스트 그리기

var isInRectangle = false;
var squr = true;

function handleMouseMove(event) {
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;

    if (mouseX >= rectX && mouseX <= rectX + rectWidth && mouseY >= rectY && mouseY <= rectY + rectHeight) {
        if (!isInRectangle) {
            isInRectangle = true;
            ctx.fillStyle = 'rgb(248, 203, 178)';
            ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
            ctx.fillStyle = 'white';
            ctx.fillText(text, textX, textY);
        }
    } else {
        if (isInRectangle) {
            isInRectangle = false;
            ctx.fillStyle = 'rgb(208,206,206)';
            ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
            ctx.fillStyle = 'white';
            ctx.fillText(text, textX, textY);
        }
    }
}

function handleClick() {
    ctx.fillStyle = 'rgb(0,32,96)';
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    ctx.fillStyle = 'white';
    ctx.fillText(text, textX, textY);

    
    squr = false;

    setTimeout(function() {
        game();
    }, 1000);

    // 클릭 후 이벤트 리스너 제거
    canvas.removeEventListener('mousemove', handleMouseMove);
}

if (squr) {
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
}

        
    
 function game()
 {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 캔버스 중앙 좌표 계산
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    // 플레이어 위치
var playerX = centerX;
var playerY = centerY;
// 랜덤 위치에 하트 그리기
var heartSize = 40; // 하트 크기
var randomX = Math.random() * (canvas.width - heartSize);
var randomY = Math.random() * (canvas.height - heartSize);

// 초당 생성되는 적의 수
var enemiesPerSecond = 5;

// 적 생성 간격 (밀리초 단위)
var enemySpawnInterval = 1000 / enemiesPerSecond;

// 생성된 적들을 저장할 배열
var enemies = [];

// 주기적으로 적 생성 함수 호출
setInterval(spawnEnemy, enemySpawnInterval);

// 적 생성 함수
function spawnEnemy() {
    // 적의 초기 위치 설정
    var side = Math.floor(Math.random() * 4); // 0: 위, 1: 아래, 2: 왼쪽, 3: 오른쪽

    var enemyX, enemyY;

    switch (side) {
        case 0: // 위
            enemyX = Math.random() * canvas.width;
            enemyY = -20;
            break;
        case 1: // 아래
            enemyX = Math.random() * canvas.width;
            enemyY = canvas.height + 20;
            break;
        case 2: // 왼쪽
            enemyX = -20;
            enemyY = Math.random() * canvas.height;
            break;
        case 3: // 오른쪽
            enemyX = canvas.width + 20;
            enemyY = Math.random() * canvas.height;
            break;
    }

    // 적의 이동 속도 (플레이어 방향으로)
    var speed = 2;

    // 적 객체 생성 및 배열에 추가
    var enemy = { x: enemyX, y: enemyY, speed: speed };
    enemies.push(enemy);
}

// 게임 업데이트 함수 (매 프레임 호출)
function update() {
    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 별 그리기
    drawStar(centerX, centerY, 5, 15, 8, 'rgb(255, 201, 14)', 'black');
    
    drawHeart(randomX, randomY, heartSize);

    // 모든 적 이동 및 그리기
    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];

        // 플레이어 쪽으로 이동
        var dx = playerX - enemy.x;
        var dy = playerY - enemy.y;
        var angle = Math.atan2(dy, dx);
        enemy.x += Math.cos(angle) * enemy.speed;
        enemy.y += Math.sin(angle) * enemy.speed;

        // 적 그리기 (원으로 표시)
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    }

    // 다음 프레임 업데이트 요청
    requestAnimationFrame(update);
}

// 게임 시작
update();
    
    
    // 별 그리기 함수
    function drawStar(cx, cy, spikes, outerRadius, innerRadius, fillColor, strokeColor) {
        var rot = Math.PI / 2 * 3;
        var x = cx;
        var y = cy;
        var step = Math.PI / spikes;
    
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (var i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;
    
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    
    // 하트 그리기 함수
    function drawHeart(x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
        ctx.bezierCurveTo(x - size, y + size / 4, x, y + size, x, y + size);
        ctx.bezierCurveTo(x, y + size, x + size, y + size / 4, x + size, y);
        ctx.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }
    
    
    
    
    
    
    
    
    
    }
       
