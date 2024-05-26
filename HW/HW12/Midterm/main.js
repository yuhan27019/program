var canvas = document.getElementById('testcanvas');
var ctx = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

gamestart();

//************************************************** */
function gamestart() {
    var rectWidth = 100;
    var rectHeight = 50;
    var rectX = (canvasWidth - rectWidth) / 2;
    var rectY = canvasHeight - rectHeight - 100;

    ctx.fillStyle = 'rgb(208,206,206)';
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    var text = '시작';
    var textX = rectX + (rectWidth - ctx.measureText(text).width) / 2;
    var textY = rectY + rectHeight / 2;
    ctx.fillText(text, textX, textY);

    var titleText = '뱀파이어 서바이벌';
    ctx.fillStyle = 'black';
    ctx.font = 'italic 30px Arial';
    var titleTextX = (canvasWidth - ctx.measureText(titleText).width) / 2;
    var titleTextY = canvasHeight / 2 - 160;
    ctx.fillText(titleText, titleTextX, titleTextY);

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

    function handleClick(event) {
        var mouseX = event.clientX - canvas.getBoundingClientRect().left;
        var mouseY = event.clientY - canvas.getBoundingClientRect().top;
    
        if (mouseX >= rectX && mouseX <= rectX + rectWidth && mouseY >= rectY && mouseY <= rectY + rectHeight) {
            ctx.fillStyle = 'rgb(0,32,96)';
            ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
            ctx.fillStyle = 'white';
            ctx.fillText(text, textX, textY);
            squr = false;
    
            setTimeout(function() {
                game();
            }, 1000);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('click', handleClick);
        }
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
    var playerX = canvas.width / 2;
    var playerY = canvas.height / 2;
    var playlife = 3;
    var rotationAngle = 3;
    var heartSize = 30;
    var randomX = Math.random() * (canvas.width - heartSize);
    var randomY = Math.random() * (canvas.height - heartSize);
    var enemiesPerSecond = 10;
    var enemySpawnInterval = 500 / enemiesPerSecond;
    var enemies = [];
    var items = []; // 아이템을 저장하기 위한 배열 추가
    var offsetX = 0;
    var offsetY = 0;
    var scale = 1;
    var heart = 3;
    var heartcount = 3;
    var deadenemy = 0;
    // 하트가 생성되었는지 여부를 나타내는 변수
    var heartSpawned = false;
    function spawnHeart() {
        // 이미 하트가 생성되었으면 더 이상 생성하지 않음
        if (heartSpawned) {
            return;
        }
        var side = Math.floor(Math.random() * 4);
        var itemheartX, itemheartY;
        
        switch (side) {
            case 0: // 첫 번째 사각형 (위쪽)
            itemheartX = Math.random() * 500 - offsetX; // 사각형의 가로 크기 + offsetX
            itemheartY = Math.random() * 200 - 200 - offsetY; // 사각형 위쪽에 생성되어야 하므로 y는 음수 + offsetY
                break;
            case 1: // 두 번째 사각형 (아래쪽)
            itemheartX = Math.random() * 500 - offsetX; // 사각형의 가로 크기 + offsetX
            itemheartY = Math.random() * 200 + 800 - offsetY; // 사각형 아래쪽에 생성되어야 하므로 y는 큰 값 + offsetY
                break;
            case 2: // 세 번째 사각형 (왼쪽)
            itemheartX = Math.random() * 200 - 200 - offsetX; // 사각형 왼쪽에 생성되어야 하므로 x는 음수 + offsetX
            itemheartY = Math.random() * 800 - offsetY; // 사각형의 세로 크기 + offsetY
                break;
            case 3: // 네 번째 사각형 (오른쪽)
            itemheartX = Math.random() * 200 + 500; // 사각형 오른쪽에 생성되어야 하므로 x는 큰 값 + offsetX
            itemheartY = Math.random() * 800; // 사각형의 세로 크기 + offsetY
                break;
        }
    
        var dx = playerX - itemheartX - offsetX;
        var dy = playerY - itemheartY - offsetY;
        var angle = Math.atan2(dy, dx);
        var speed = 2;

        var heartpos = { x: itemheartX, y: itemheartY};
        items.push(heartpos);
        // 하트가 생성되었음을 표시
        heartSpawned = true;
    }

    setInterval(spawnEnemy, enemySpawnInterval);

    function spawnEnemy() {
        //if (enemies.length >= 100) return;
        var side = Math.floor(Math.random() * 4);
        var enemyX, enemyY;
        
        switch (side) {
            case 0: // 첫 번째 사각형 (위쪽)
                enemyX = Math.random() * 500 - offsetX; // 사각형의 가로 크기 + offsetX
                enemyY = Math.random() * 200 - 200 - offsetY; // 사각형 위쪽에 생성되어야 하므로 y는 음수 + offsetY
                break;
            case 1: // 두 번째 사각형 (아래쪽)
                enemyX = Math.random() * 500 - offsetX; // 사각형의 가로 크기 + offsetX
                enemyY = Math.random() * 200 + 800 - offsetY; // 사각형 아래쪽에 생성되어야 하므로 y는 큰 값 + offsetY
                break;
            case 2: // 세 번째 사각형 (왼쪽)
                enemyX = Math.random() * 200 - 200 - offsetX; // 사각형 왼쪽에 생성되어야 하므로 x는 음수 + offsetX
                enemyY = Math.random() * 800 - offsetY; // 사각형의 세로 크기 + offsetY
                break;
            case 3: // 네 번째 사각형 (오른쪽)
                enemyX = Math.random() * 200 + 500; // 사각형 오른쪽에 생성되어야 하므로 x는 큰 값 + offsetX
                enemyY = Math.random() * 800; // 사각형의 세로 크기 + offsetY
                break;
        }

        var dx = playerX - enemyX - offsetX;
        var dy = playerY - enemyY - offsetY;
        var angle = Math.atan2(dy, dx);
        var speed = 2;

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

    // 마우스 클릭 여부 변수
    var isMouseClicked = false;
    var ischeck = true;

    // 마우스 클릭 이벤트 리스너 등록
    canvas.addEventListener('mousedown', function(event) {
        isMouseClicked = true;

    });

    // 마우스 클릭 해제 이벤트 리스너 등록
     canvas.addEventListener('mouseup', function(event) {
        
     });

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if ('ArrowUp' in keysPressed) {
            offsetY += 2;
        }
        if ('ArrowDown' in keysPressed) {
            offsetY -= 2;
        }
        if ('ArrowLeft' in keysPressed) {
            offsetX += 2;
        }
        if ('ArrowRight' in keysPressed) {
            offsetX -= 2;
        }

        rotationAngle += 0.01;
        function repeatFunction() {
            if (heart > 0) {
                if (isMouseClicked) {
                    if(ischeck)
                    {
                        scale = 1;
                        heartcount--;
                    }
                    ischeck = false;
                    
                    scale += 0.05;
                    if(scale > 8)
                    {
                        isMouseClicked = false;
                        scale = 1;
                        heart--;
                        ischeck = true;
                    }
                }   
            }
        }
        
        // 초기 호출
        repeatFunction();
        

        drawStar(playerX, playerY, 5, 15, 8, 'rgb(255, 201, 14)', 'black', isMouseClicked, scale);
        // 하트 간격 설정
var heartSpacing = 30;

// 하트를 그리는 함수를 호출하여 하트를 순서대로 그립니다.
for (var i = 0; i < heartcount; i++) {
    var heartX = canvas.width - (heartSize + heartSpacing) * (i + 1);
    var heartY = 20; // 하트의 수직 위치 조정
    drawHeart(heartX, heartY, heartSize);
}


        for (var i = enemies.length - 1; i >= 0; i--) {
            var enemy = enemies[i];

            enemy.x += Math.cos(enemy.angle) * enemy.speed;
            enemy.y += Math.sin(enemy.angle) * enemy.speed;

            if (enemy.x + offsetX >= 0 && enemy.x + offsetX <= canvas.width && enemy.y + offsetY >= 0 && enemy.y + offsetY <= canvas.height) {
                enemy.enteredScreen = true;
            }

            ctx.beginPath();
            ctx.arc(enemy.x + offsetX, enemy.y + offsetY, 8, 0, Math.PI * 2);
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.closePath();
            if(isMouseClicked)
            {
                if (collisionDetection(playerX, playerY, enemy.x + offsetX, enemy.y + offsetY, 5*scale*2.5, 5)) {
                    enemies.splice(i, 1);
                    deadenemy++;
                }
            }else{
                if (collisionDetection(playerX, playerY, enemy.x + offsetX, enemy.y + offsetY, 5, 5)) {
                    playlife--;
                    enemies.splice(i, 1);
                    if (playlife <= 0) {
                        alert("Game Over! Your playlife is zero!");
                        gameover();
                        return;
                    }
                }
            }
    
            

            if (enemy.enteredScreen && (enemy.x + offsetX < -20 || enemy.x + offsetX > canvas.width + 20 || enemy.y + offsetY < -20 || enemy.y + offsetY > canvas.height + 20)) {
                enemies.splice(i, 1);
            }
        }

        for (var i = items.length - 1; i >= 0; i--) {
            var item = items[i];
        
            if (collisionDetection(playerX, playerY, item.x + offsetX, item.y + offsetY, 5, 5)) {
                items.splice(i, 1); // 충돌한 아이템 제거
                heart++; // 하트 증가
                heartcount++; // 하트 개수 증가
                heartSpawned = false; // 하트가 다시 생성되도록 설정
                break; // 충돌한 아이템 처리 후 루프 종료
            }       
        }

        // 숫자를 그리는 함수
function drawNumber(x, y, number) {
    // 숫자의 너비와 높이 설정
    var width = 50;
    var height = 80;

    switch (number) {
        // 각 숫자에 맞게 선을 그립니다.
        case '0':
                ctx.beginPath();
                ctx.moveTo(x + 5, y);
                ctx.lineTo(x + 45, y);
                ctx.lineTo(x + 45, y + 50);
                ctx.lineTo(x + 5, y + 50);
                ctx.lineTo(x + 5, y);
                ctx.stroke();
                break;
            case '1':
                ctx.beginPath();
                ctx.moveTo(x + 45, y);
                ctx.lineTo(x + 45, y + 50);
                ctx.stroke();
                break;
            case '2':
                ctx.beginPath();
                ctx.moveTo(x + 5, y);
                ctx.lineTo(x + 45, y);
                ctx.lineTo(x + 45, y + 25);
                ctx.lineTo(x + 5, y + 25);
                ctx.lineTo(x + 5, y + 50);
                ctx.lineTo(x + 45, y + 50);
                ctx.stroke();
                break;
            case '3':
                ctx.beginPath();
                ctx.moveTo(x + 5, y);
                ctx.lineTo(x + 45, y);
                ctx.lineTo(x + 45, y + 50);
                ctx.moveTo(x + 5, y + 25);
                ctx.lineTo(x + 45, y + 25);
                ctx.moveTo(x + 5, y + 50);
                ctx.lineTo(x + 45, y + 50);
                ctx.stroke();
                break;
            case '4':
                ctx.beginPath();
                ctx.moveTo(x + 5, y);
                ctx.lineTo(x + 5, y + 25);
                ctx.lineTo(x + 45, y + 25);
                ctx.moveTo(x + 45, y);
                ctx.lineTo(x + 45, y + 50);
                ctx.stroke();
                break;
            case '5':
                ctx.beginPath();
                ctx.moveTo(x + 45, y);
                ctx.lineTo(x + 5, y);
                ctx.lineTo(x + 5, y + 25);
                ctx.lineTo(x + 45, y + 25);
                ctx.lineTo(x + 45, y + 50);
                ctx.lineTo(x + 5, y + 50);
                ctx.stroke();
                break;
            case '6':
                ctx.beginPath();
                ctx.moveTo(x + 45, y);
                ctx.lineTo(x + 5, y);
                ctx.lineTo(x + 5, y + 50);
                ctx.lineTo(x + 45, y + 50);
                ctx.lineTo(x + 45, y + 25);
                ctx.lineTo(x + 5, y + 25);
                ctx.stroke();
                break;
            case '7':
                ctx.beginPath();
                ctx.moveTo(x + 5, y);
                ctx.lineTo(x + 45, y);
                ctx.lineTo(x + 45, y + 50);
                ctx.stroke();
                break;
            case '8':
                ctx.beginPath();
                ctx.moveTo(x + 5, y);
                ctx.lineTo(x + 45, y);
                ctx.lineTo(x + 45, y + 50);
                ctx.lineTo(x + 5, y + 50);
                ctx.lineTo(x + 5, y);
                ctx.moveTo(x + 5, y + 25);
                ctx.lineTo(x + 45, y + 25);
                ctx.stroke();
                break;
            case '9':
                ctx.beginPath();
                ctx.moveTo(x + 5, y);
                ctx.lineTo(x + 45, y);
                ctx.lineTo(x + 45, y + 25);
                ctx.lineTo(x + 5, y + 25);
                ctx.lineTo(x + 5, y);
                ctx.moveTo(x + 45, y + 25);
                ctx.lineTo(x + 45, y + 50);
                ctx.stroke();
    }
}

// 표시할 숫자를 디지털 스타일로 표시합니다.
function drawDigitalNumber(x, y, number) {
    // 숫자 하나의 너비
    var digitWidth = 50;

    // 각 숫자를 하나씩 그립니다.
    for (var i = 0; i < number.length; i++) {
        var digit = number[i];
        drawNumber(x + i * digitWidth, y, digit);
    }
}

drawDigitalNumber(10, 30, deadenemy.toString());

        requestAnimationFrame(update);
    }

    update();

    function collisionDetection(x1, y1, x2, y2, r1, r2) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        var distance = Math.sqrt(dx * dx + dy * dy);
        return distance < r1 + r2;
    }
    
    function drawStar(cx, cy, spikes, outerRadius, innerRadius, fillColor, strokeColor, isMouseClicked, scale) {
        var rotation = rotationAngle;
        var rot = Math.PI / 2 * 3 + rotation;
        var step = Math.PI / spikes;
    
        // 별 내부를 그리기 위한 함수
        ctx.beginPath();
            ctx.moveTo(
                cx + Math.cos(rot) * outerRadius,
                cy + Math.sin(rot) * outerRadius
            );
    
            for (var i = 0; i < spikes; i++) {
                var x = cx + Math.cos(rot) * outerRadius;
                var y = cy + Math.sin(rot) * outerRadius;
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
            ctx.fillStyle = fillColor;
            ctx.fill();

        // 별 윤곽선 그리기
        if (isMouseClicked) {
            rot = Math.PI / 2 * 3 + rotation;
            ctx.beginPath();
            ctx.moveTo(
                cx + Math.cos(rot) * outerRadius * scale,
                cy + Math.sin(rot) * outerRadius * scale
            );
    
            for (var i = 0; i < spikes; i++) {
                var x = cx + Math.cos(rot) * outerRadius * scale;
                var y = cy + Math.sin(rot) * outerRadius * scale;
                ctx.lineTo(x, y);
                rot += step;
    
                x = cx + Math.cos(rot) * innerRadius * scale;
                y = cy + Math.sin(rot) * innerRadius * scale;
                ctx.lineTo(x, y);
                rot += step;
            }
    
            ctx.lineTo(
                cx + Math.cos(Math.PI / 2 * 3 + rotation) * outerRadius * scale,
                cy + Math.sin(Math.PI / 2 * 3 + rotation) * outerRadius * scale
            );
    
            ctx.closePath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = strokeColor;
            ctx.stroke(); // 마우스 클릭 시 윤곽선 2배


            ctx.beginPath();
            ctx.arc(cx, cy, outerRadius * scale, 0, Math.PI * 2);
            ctx.closePath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "green";
            ctx.stroke();
        } else {
            rot = Math.PI / 2 * 3 + rotation;
            ctx.beginPath();
            ctx.moveTo(
                cx + Math.cos(rot) * outerRadius * scale,
                cy + Math.sin(rot) * outerRadius * scale
            );
    
            for (var i = 0; i < spikes; i++) {
                var x = cx + Math.cos(rot) * outerRadius * scale;
                var y = cy + Math.sin(rot) * outerRadius * scale;
                ctx.lineTo(x, y);
                rot += step;
    
                x = cx + Math.cos(rot) * innerRadius * scale;
                y = cy + Math.sin(rot) * innerRadius * scale;
                ctx.lineTo(x, y);
                rot += step;
            }
    
            ctx.lineTo(
                cx + Math.cos(Math.PI / 2 * 3 + rotation) * outerRadius * scale,
                cy + Math.sin(Math.PI / 2 * 3 + rotation) * outerRadius * scale
            );
    
            ctx.closePath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = strokeColor;
            ctx.stroke(); // 마우스 클릭 아닐 시 윤곽선 기본 크기

            ctx.beginPath();
            ctx.arc(cx, cy, outerRadius * scale, 0, Math.PI * 2);
            ctx.closePath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "green";
            ctx.stroke();
        }
    
        
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
    function drawitemHeart(x, y, size) {
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

function handleClick(event) {
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;

    if (mouseX >= rectX && mouseX <= rectX + rectWidth && mouseY >= rectY && mouseY <= rectY + rectHeight) {
        ctx.fillStyle = 'rgb(0,32,96)';
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
        ctx.fillStyle = 'white';
        ctx.fillText(text, textX, textY);
        squr = false;

        setTimeout(function() {
            game();
        }, 1000);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('click', handleClick);
    }
}

if (squr) {
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
}
}
       