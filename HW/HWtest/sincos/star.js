var canvas = document.getElementById('sincanvas');
var ctx = canvas.getContext('2d');

    // 별 모양 그리기 함수
    function drawStar(x, y, size) {
        // 별을 그리는 경로 설정
        ctx.beginPath();
        ctx.moveTo(x, y - size / 2);
        ctx.lineTo(x + size / 3, y + size / 6);
        ctx.lineTo(x + size / 2, y + size / 2);
        ctx.lineTo(x, y + size / 3);
        ctx.lineTo(x - size / 2, y + size / 2);
        ctx.lineTo(x - size / 3, y + size / 6);
        ctx.closePath();

        // 채우기 색상 및 선 색상 설정
        ctx.fillStyle = 'pink';
        ctx.strokeStyle = 'pink';

        // 별 채우기 및 그리기
        ctx.fill();
        ctx.stroke();
    }

    // 캔버스에 별 그리기
    drawStar(canvas.width / 2, canvas.height / 2, 100);