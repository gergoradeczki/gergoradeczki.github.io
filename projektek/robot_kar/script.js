var canvas, ctx, width, height, length, radius, speed,stuck;
width = 720;
height = 720;
length = 100;
radius = 5;
stuck = false;
speed = {
	sum: 1,
	x: 0,
	y: 0
};

var vall = {
	x: width/2,
	y: height/2
};
var konyok = {
	x: width/2 + 100,
	y: height/2
};
var kezfej = {
	x: width/2+1,
	y: height/2
};
var destination = {
	x: 500,
	y: 400
}

function setCanvas() {
	document.getElementById("xCor").value = destination.x;
	document.getElementById("yCor").value = destination.y;

    canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
}

function animation() {
    requestId = requestAnimationFrame(animation);
	calculateKonyokPos();
	if(Math.pow(kezfej.x-vall.x+speed.x, 2) + Math.pow(kezfej.y-vall.y+speed.y, 2) < Math.pow(2*length, 2)) {
			var angle = Math.atan((destination.y-kezfej.y)/(destination.x-kezfej.x));
			speed.x = Math.abs(speed.sum*Math.cos(angle));
			speed.y = Math.abs(speed.sum*Math.sin(angle));
			if(destination.x - kezfej.x > 0)  {
				kezfej.x += speed.x;
			} else {
				kezfej.x -= speed.x;
			}
			if(destination.y - kezfej.y > 0)  {
				kezfej.y += speed.y;
			} else {
				kezfej.y -= speed.y;
			}
		
	} else {
		stuck = true;
	}
	if(stuck) {
		if(destination.x - kezfej.x > 0)  {
			kezfej.x -= 2*speed.x;
		} else {
			kezfej.x += 2*speed.x;
		}
		if(destination.y - kezfej.y > 0)  {
			kezfej.y -= 2*speed.y;
		} else {
			kezfej.y += 2*speed.y;
		}
		stuck = false;
	}
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
	drawDestination();
}
function drawBorderCircle() {
	ctx.beginPath();
	ctx.arc(width/2, height/2, 2*length, 0, 2*Math.PI, false);
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
	
	/*ctx.beginPath();
	ctx.arc(konyok.x, konyok.y, length, 0, 2*Math.PI, false);
	ctx.strokeStyle = "green";
	ctx.stroke();*/
}
function drawVall() {
	ctx.beginPath();
	ctx.arc(vall.x, vall.y, radius, 0, 2*Math.PI, false);
	ctx.fillStyle = "black";
	ctx.fill();
	
	/*ctx.beginPath();
	ctx.arc(vall.x, vall.y, length, 0, 2*Math.PI, false);
	ctx.strokeStyle = "red";
	ctx.stroke();*/
}
function drawDestination() {
	ctx.beginPath();
	ctx.arc(destination.x, destination.y, radius, 0, 2*Math.PI, false);
	ctx.fillStyle = "blue";
	ctx.fill();
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

function setDestination() {
	var x = document.getElementById("xCor").value;
	var y = document.getElementById("yCor").value
	if(Math.pow(vall.x - x, 2) + Math.pow(vall.y - y, 2) <= Math.pow(2*length, 2)) {
		destination.x = document.getElementById("xCor").value;
		destination.y = document.getElementById("yCor").value;
	} else {
		alert("A megadott koordinátájú pont nem elérhető a robot számára (nincs benne a körben)!");
	}
}

function calculateKonyokPos() {

	var ACvector = {
		x: kezfej.x - vall.x,
		y: kezfej.y - vall.y
	}
	var distanceAC = Math.sqrt(ACvector.x*ACvector.x + ACvector.y*ACvector.y);
	var merolegesAC = {
		x: ACvector.y,
		y: -1*ACvector.x
	}
	var felezopont = {
		x: vall.x + ACvector.x/2,
		y: vall.y + ACvector.y/2
	}
	var magassag = Math.sqrt(length*length - (distanceAC*distanceAC)/4);
	var magassagVektor = {
		x: (merolegesAC.x*magassag)/distanceAC,
		y: (merolegesAC.y*magassag)/distanceAC,
	}

	konyok.x = felezopont.x - magassagVektor.x,
	konyok.y = felezopont.y - magassagVektor.y
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