var canvas = document.getElementById('drawbord');
    var ctx = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var orbitRadius = 300; // 공전 반지름 계산
    var rotationSpeed = 0.01; // 파란색 원의 공전 속도
    var revolutionspeed = 0.07; // 노란색 원의 공전 속도
    var angleyellow = 0;
    var angle = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 중심에 고정된 원 그리기 (빨간색)
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI, false); // 중심 원의 반지름을 30으로 설정
        ctx.fillStyle = 'red';
        ctx.fill();

        // 파란색 원의 위치 계산
        var x = centerX + orbitRadius * Math.cos(angle);
        var y = centerY + orbitRadius * Math.sin(angle);

        // 파란색 원 그리기 (공전)
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI, false); // 파란색 원의 반지름은 20으로 가정
        ctx.fillStyle = 'blue';
        ctx.fill();

        // 노란색 원의 위치 계산 (파란색 원의 왼쪽으로 설정)
        var yellowX = x - 100 * Math.cos(angleyellow + Math.PI / 1.333); // 파란색 원의 반지름(20) + 노란색 원과 파란색 원의 거리
        var yellowY = y - 100 * Math.sin(angleyellow + Math.PI / 1.333); // 파란색 원의 반지름(20) + 노란색 원과 파란색 원의 거리

        // 노란색 원 그리기
        ctx.beginPath();
        ctx.arc(yellowX, yellowY, 15, 0, 2 * Math.PI, false); // 노란색 원의 반지름은 15로 가정
        ctx.fillStyle = 'yellow';
        ctx.fill();

        // 공전 각도 업데이트
        angle += rotationSpeed; // 파란색 원의 오른쪽으로 공전
        angleyellow -= revolutionspeed; // 노란색 원의 왼쪽으로 공전
        

        // 다음 프레임 요청
        requestAnimationFrame(draw);
    }

    draw(); // 애니메이션 시작