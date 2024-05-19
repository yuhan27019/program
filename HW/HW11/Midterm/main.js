var canvas = document.getElementById('testcanvas');
var ctx = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

gamestart();

//************************************************** */
function gamestart()
{
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
}

//*********************************************************** */

// 방향키 이벤트 감지

    
function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var playerX = centerX;
    var playerY = centerY;
    var playlife = 3;
    var rotationAngle = 3;
    var heartSize = 40;
    var randomX = Math.random() * (canvas.width - heartSize);
    var randomY = Math.random() * (canvas.height - heartSize);
    var enemiesPerSecond = 10;
    var enemySpawnInterval = 1000 / enemiesPerSecond;
    var enemies = [];
    
    setInterval(spawnEnemy, enemySpawnInterval);
    
    function spawnEnemy() {
        if (enemies.length >= 100) return;
        var side = Math.floor(Math.random() * 4);
        var enemyX, enemyY;
    
        switch (side) {
            case 0:
                enemyX = Math.random() * canvas.width;
                enemyY = -20;
                break;
            case 1:
                enemyX = Math.random() * canvas.width;
                enemyY = canvas.height + 20;
                break;
            case 2:
                enemyX = -20;
                enemyY = Math.random() * canvas.height;
                break;
            case 3:
                enemyX = canvas.width + 20;
                enemyY = Math.random() * canvas.height;
                break;
        }
    
        var dx = playerX - enemyX;
        var dy = playerY - enemyY;
        var angle = Math.atan2(dy, dx);
        var speed = 1;
    
        var enemy = { x: enemyX, y: enemyY, angle: angle, speed: speed, enteredScreen: false };
        enemies.push(enemy);
    }
    
    var keysPressed = {};
    
    document.addEventListener('keydown', function(event) {
        keysPressed[event.key] = true;
    });
    
    document.addEventListener('keyup', function(event) {
        delete keysPressed[event.key];
    });
    
    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawStar(playerX, playerY, 5, 15, 8, 'rgb(255, 201, 14)', 'black');
        if ('ArrowUp' in keysPressed) {
            playerY -= 2;
        }
        if ('ArrowDown' in keysPressed) {
            playerY += 2;
        }
        if ('ArrowLeft' in keysPressed) {
            playerX -= 2;
        }
        if ('ArrowRight' in keysPressed) {
            playerX += 2;
        }
        rotationAngle += 0.01;
        
        drawHeart(randomX, randomY, heartSize);
    
        for (var i = enemies.length - 1; i >= 0; i--) {
            var enemy = enemies[i];
    
            enemy.x += Math.cos(enemy.angle) * enemy.speed;
            enemy.y += Math.sin(enemy.angle) * enemy.speed;
    
            // Check if enemy has entered the screen
            if (enemy.x >= 0 && enemy.x <= canvas.width && enemy.y >= 0 && enemy.y <= canvas.height) {
                enemy.enteredScreen = true;
            }
    
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.closePath();
    
            if (collisionDetection(playerX, playerY, enemy.x, enemy.y, 5, 5)) {
                playlife--;
                enemies.splice(i, 1);
                if (playlife <= 0) {
                    alert("Game Over! Your playlife is zero!");
                    gameover();
                    return;
                }
            }

            // 적이 캔버스 밖으로 나가면 제거
            if (enemy.enteredScreen && (enemy.x < -20 || enemy.x > canvas.width + 20 || enemy.y < -20 || enemy.y > canvas.height + 20)) {
                enemies.splice(i, 1);
            }
        }
        // 현재 적 수를 캔버스에 표시
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Enemies: ' + enemies.length, 10, 30);
    
        requestAnimationFrame(update);
    }
    
    update();
    
    function collisionDetection(x1, y1, x2, y2, r1, r2) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        var distance = Math.sqrt(dx * dx + dy * dy);
        return distance < r1 + r2;
    }
    
    function drawStar(cx, cy, spikes, outerRadius, innerRadius, fillColor, strokeColor) {
        var rotation = rotationAngle; // 회전 각도 추가
        var rot = Math.PI / 2 * 3 + rotation;
        var step = Math.PI / spikes;
    
        ctx.beginPath();
        ctx.moveTo(
            cx + Math.cos(rot) * outerRadius,
            cy + Math.sin(rot) * outerRadius
        );
    
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
    
        ctx.lineTo(
            cx + Math.cos(Math.PI / 2 * 3 + rotation) * outerRadius,
            cy + Math.sin(Math.PI / 2 * 3 + rotation) * outerRadius
        );
        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    
    
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


function gameover()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
var titleText = '게임오버'; // 타이틀 텍스트
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
}
       