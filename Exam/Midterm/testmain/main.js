var canvas = document.getElementById('testcanvas');
var ctx = canvas.getContext('2d');

// 캔버스의 너비와 높이
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

        

var isInRectangle = false;
var start = false;
var squr = true;
if(squr)
{
    canvas.addEventListener('mousemove', function(event) {
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
    });

    canvas.addEventListener('click', function() {
        ctx.fillStyle = 'rgb(0,32,96)';
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
        ctx.fillStyle = 'white';
        ctx.fillText(text, textX, textY);

        var textContainer = document.getElementById('text-container');
        textContainer.style.display = 'none';
        squr = false;
        
        
        setTimeout(function() {
            game();
        }, 1000);
    })
        
    
}
 function game()
 {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    function degToRad(degrees) {
        return degrees * Math.PI / 180;
    }
    
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
    
    // 캔버스 중앙 좌표 계산
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    
    // 별 그리기 (크기를 더 작게 조절)
    drawStar(centerX, centerY, 5, 15, 8, 'rgb(255, 201, 14)', 'black');
    
    // 랜덤 위치에 하트 그리기
    var heartSize = 40; // 하트 크기
    var randomX = Math.random() * (canvas.width - heartSize);
    var randomY = Math.random() * (canvas.height - heartSize);
    drawHeart(randomX, randomY, heartSize);
    
    
    }
       

