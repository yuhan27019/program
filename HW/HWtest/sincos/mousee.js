var canvas = document.getElementById('sincanvas');
    var ctx = canvas.getContext('2d');
    var isDrawing = false; // 그리기 상태 여부를 저장하는 변수
    var startX, startY; // 선을 그리기 시작할 좌표를 저장하는 변수
    var lineColor = 'black'; // 선의 기본 색상을 검은색으로 설정

    // 마우스 왼쪽 버튼을 눌렀을 때
    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true; // 그리기 상태로 변경
        startX = e.clientX - canvas.getBoundingClientRect().left; // 마우스 클릭한 위치의 x 좌표
        startY = e.clientY - canvas.getBoundingClientRect().top; // 마우스 클릭한 위치의 y 좌표
        ctx.beginPath(); // 새로운 경로 시작
        ctx.moveTo(startX, startY); // 시작점 설정
    });

    // 마우스 이동 중
    canvas.addEventListener('mousemove', function(e) {
        if (isDrawing) {
            var mouseX = e.clientX - canvas.getBoundingClientRect().left; // 현재 마우스의 x 좌표
            var mouseY = e.clientY - canvas.getBoundingClientRect().top; // 현재 마우스의 y 좌표
            ctx.lineTo(mouseX, mouseY); // 현재 마우스 위치까지 선 그리기
            ctx.strokeStyle = lineColor; // 선의 색상 설정
            ctx.stroke(); // 선 그리기
        }
    });

    // 마우스 왼쪽 버튼을 뗐을 때
    canvas.addEventListener('mouseup', function(e) {
        isDrawing = false; // 그리기 상태 해제
    });

    // 마우스가 캔버스 영역을 벗어났을 때
    canvas.addEventListener('mouseleave', function(e) {
        isDrawing = false; // 그리기 상태 해제
    });

    // 캔버스 초기화 버튼 클릭 시
    var clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스를 모두 지움
    });

    // 체크박스 클릭 시 선의 색상을 변경하는 함수
    function updateColor() {
        var redCheckbox = document.getElementById('redCheckbox');
        var greenCheckbox = document.getElementById('greenCheckbox');
        var blueCheckbox = document.getElementById('blueCheckbox');

        lineColor = 'black'; // 기본 색상을 검은색으로 설정

        // 체크된 체크박스에 따라 색상을 변경
        if (redCheckbox.checked) {
            lineColor = 'red';
        }
        if (greenCheckbox.checked) {
            lineColor = 'green';
        }
        if (blueCheckbox.checked) {
            lineColor = 'blue';
        }
    }

    // 체크박스 클릭 이벤트 리스너 등록
    var checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('click', function() {
            updateColor(); // 체크박스 클릭 시 선의 색상 업데이트
        });
    });