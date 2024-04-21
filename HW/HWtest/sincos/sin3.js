var canvas = document.getElementById("sincanvas");
        var ctx = canvas.getContext("2d");

        var bluex = 50;
        var bluey = 50;
        var redx = canvas.width / 2 - 100;
        var redy = 50;
        var dx = 4;
        var dy = 4;

        function checkOverlap() {
            var blueCircle = {
                x: bluex + 100,
                y: bluey + 50,
                radius: 100
            };

            var redCircle = {
                x: redx + 50,
                y: redy + 100,
                radius: 100
            };

            var distanceX = blueCircle.x - redCircle.x;
            var distanceY = blueCircle.y - redCircle.y;
            var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            var overlapArea = 0;

            if (distance < blueCircle.radius + redCircle.radius) {
                var overlapRadius = Math.min(blueCircle.radius, redCircle.radius) - (blueCircle.radius + redCircle.radius - distance);
                overlapArea = Math.PI * overlapRadius * overlapRadius;
            }

            if (overlapArea > 0) {
                document.getElementById("overlapMessage").textContent = "원이 겹칩니다! 겹친 영역의 넓이는 " + overlapArea.toFixed(2) + "입니다.";
                document.getElementById("overlapMessage").style.display = "block";
            } else {
                document.getElementById("overlapMessage").textContent = "";
                document.getElementById("overlapMessage").style.display = "none";
            }
        }

        function drawCircle() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(bluex + 100, bluey + 50, 100, 0, 2 * Math.PI);
            ctx.fill();

            bluex += dx;

            if (bluex + 200 > canvas.width || bluex < 0) {
                dx = -dx;
            }

            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(redx + 50, redy + 100, 100, 0, 2 * Math.PI);
            ctx.fill();

            redy += dy;

            if (redy + 200 > canvas.height || redy < 0) {
                dy = -dy;
            }

            checkOverlap();

            requestAnimationFrame(drawCircle);
        }

        drawCircle();