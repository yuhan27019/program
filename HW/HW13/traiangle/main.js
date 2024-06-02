const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const triangle = [
            { x: 0, y: -100 },
            { x: -87, y: 50 },
            { x: 87, y: 50 }
        ];

        let angle = 0;
        let fillColor = 'yellow';

        function drawTriangle() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle);

            ctx.beginPath();
            ctx.moveTo(triangle[0].x, triangle[0].y);
            triangle.forEach(point => ctx.lineTo(point.x, point.y));
            ctx.closePath();

            ctx.fillStyle = fillColor;
            ctx.fill();

            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.restore();

            angle += 0.01;

            requestAnimationFrame(drawTriangle);
        }


        function isPointInTriangle(px, py, t) {
            const {x: x1, y: y1} = t[0];
            const {x: x2, y: y2} = t[1];
            const {x: x3, y: y3} = t[2];

            // 분모 계산
    const denominator = ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
    
    // 배리센트릭 좌표 a 계산
    const a = ((y2 - y3) * (px - x3) + (x3 - x2) * (py - y3)) / denominator;
    
    // 배리센트릭 좌표 b 계산
    const b = ((y3 - y1) * (px - x3) + (x1 - x3) * (py - y3)) / denominator;
    
    // 배리센트릭 좌표 c 계산
    const c = 1 - a - b;

    // 삼각형 내부에 있는지 확인
    return 0 <= a && a <= 1 && 0 <= b && b <= 1 && 0 <= c && c <= 1;
        }

        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const rotatedTriangle = triangle.map(point => {
                const x = point.x * Math.cos(angle) - point.y * Math.sin(angle);
                const y = point.x * Math.sin(angle) + point.y * Math.cos(angle);
                return { x: x + centerX, y: y + centerY };
            });

            if (isPointInTriangle(mouseX, mouseY, rotatedTriangle)) {
                fillColor = fillColor === 'yellow' ? 'red' : 'yellow';
            }
        });

        drawTriangle();