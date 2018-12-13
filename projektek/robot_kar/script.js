var canvas, ctx, width, height, lenght, radius;
width = 720;
height = 720;
lenght = 100;
radius = 5;
var kezfej = {
	x: height/2 + 200,
	y: width/2
};
var konyok = {
	x: height/2 + 100,
	y: width/2
};
var vall = {
	x: height/2,
	y: width/2
};

function setCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
}

function animation() {
    requestId = requestAnimationFrame(animation);

    draw();
}

function draw() {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 2;

	drawBorderCircle();
	drawFelkar();
	drawAlkar();
	drawKez();
	drawKonyok();
	drawVall();
}
function drawBorderCircle() {
	ctx.beginPath();
	ctx.arc(width/2, height/2, 2*lenght, 0, 2*Math.PI, false);
	ctx.strokeStyle = "black";
	ctx.stroke();
}
function drawKez() {
	ctx.beginPath();
	ctx.arc(kezfej.x, kezfej.y, radius, 0, 2*Math.PI, false);
	ctx.fillStyle = "green";
	ctx.fill();
}
function drawKonyok() {
	ctx.beginPath();
	ctx.arc(konyok.x, konyok.y, radius, 0, 2*Math.PI, false);
	ctx.fillStyle = "red";
	ctx.fill();
	
	ctx.beginPath();
	ctx.arc(konyok.x, konyok.y, lenght, 0, 2*Math.PI, false);
	ctx.strokeStyle = "green";
	ctx.stroke();
}
function drawVall() {
	ctx.beginPath();
	ctx.arc(vall.x, vall.y, radius, 0, 2*Math.PI, false);
	ctx.fillStyle = "black";
	ctx.fill();
	
	ctx.beginPath();
	ctx.arc(vall.x, vall.y, lenght, 0, 2*Math.PI, false);
	ctx.strokeStyle = "red";
	ctx.stroke();
}
function drawFelkar() {
	ctx.beginPath();
	
    ctx.moveTo(vall.x, vall.y);
    ctx.lineTo(konyok.x, konyok.y);
    ctx.lineWidth = 3;
	ctx.strokeStyle = "black";
	ctx.stroke();
}
function drawAlkar() {
	ctx.beginPath();
    ctx.moveTo(konyok.x, konyok.y);
	ctx.lineTo(kezfej.x, kezfej.y);
    ctx.lineWidth = 3;
	ctx.strokeStyle = "black";
	ctx.stroke();
}

function start() {
    if(requestId == 0) {
        requestAnimationFrame(animation);
    }

}
function stop() {
    if(requestId > 0) {
        cancelAnimationFrame(requestId);
        requestId = 0;
    }
}