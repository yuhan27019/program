// 캔버스 요소 가져오기
var canvas = document.getElementById('sincanvas');
var ctx = canvas.getContext('2d');

// 곡선 그리기
ctx.beginPath(); // 새로운 경로 시작
ctx.moveTo(100, 100); // 시작점 설정
ctx.quadraticCurveTo(200, 0, 300, 100); // 이차 베지어 곡선 그리기
ctx.strokeStyle = 'blue'; // 선 색상 설정
ctx.lineWidth = 5; // 선 두께 설정
ctx.stroke(); // 선 그리기

// 곡선 그리기

ctx.moveTo(225, 50); // 시작점 설정
ctx.quadraticCurveTo(375, 0, 500, 100); // 이차 베지어 곡선 그리기
ctx.strokeStyle = 'blue'; // 선 색상 설정
ctx.lineWidth = 5; // 선 두께 설정
ctx.stroke(); // 선 그리기

// 곡선 그리기

ctx.moveTo(410, 50); // 시작점 설정
ctx.quadraticCurveTo(575, 0, 700, 100); // 이차 베지어 곡선 그리기
ctx.strokeStyle = 'blue'; // 선 색상 설정
ctx.lineWidth = 5; // 선 두께 설정
ctx.stroke(); // 선 그리기

ctx.moveTo(700, 100); // 시작점 설정
ctx.quadraticCurveTo(650, 225, 350, 250); // 이차 베지어 곡선 그리기
ctx.strokeStyle = 'blue'; // 선 색상 설정
ctx.lineWidth = 5; // 선 두께 설정
ctx.stroke(); // 선 그리기

ctx.moveTo(350, 250); // 시작점 설정
ctx.quadraticCurveTo(150, 225, 100, 100); // 이차 베지어 곡선 그리기
ctx.strokeStyle = 'blue'; // 선 색상 설정
ctx.lineWidth = 5; // 선 두께 설정
ctx.stroke(); // 선 그리기

