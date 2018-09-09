var canvas, ctx, fps, interval, period, now, then, delta, a, b, c, fi, omega, time, velocity, requestId, centripetalVelocity, acceleration, circleX, circleY, lineX;
then = Date.now();

//képkocka per másodperc
fps = 60;
interval = 1000/fps;

//ennyi másodperc alatt ér körbe
period = 10;
//kör sugara/amplitúdó pixelben
radius = 200;
//kör X és Y koordinátája pixelben
circleX = 300;
circleY = 400;
//oldalso függőleges vonal X koordinátája pixelben
lineX = 700;

//később nem fognak változni
omega = (2 * Math.PI) / period;
centripetalVelocity = radius * (2 * Math.PI) / period;
//idő elteltével változni fog az értékük
a = 0;
b = 0;
c = 0;
time = 0;
velocity = 0;
acceleration = 0;

function setCanvas() {
    document.getElementById("fps").value = fps;
    document.getElementById("amplitudo").value = radius;
    document.getElementById("rezgesido").value = period;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
}

function animation() {
    requestId = requestAnimationFrame(animation);

    now = Date.now();
    delta = now - then;
    
    if(delta > interval) {
        then = now - (delta % interval);
        if(time >= period && document.getElementById("toggleAngle").checked != true) {
            time -= period;
        } else {
            time += 1/fps;
        }
        //console.log(timer);

        fi = omega * time;
        a = radius * Math.sin(fi);
        b = radius * Math.cos(fi);
        velocity = radius * omega * Math.cos(fi);
        c = centripetalVelocity * Math.sin(fi);
        acceleration = -1 * radius * Math.pow(omega, 2) * Math.sin(fi);
        
        draw();
    }
}

function draw() {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, 800, 800);
    ctx.lineWidth = 2;

    updateValues();

    drawDashedLine();
    drawLine();
    drawCircle();
    drawRightSide();
    if(document.getElementById("toggleTriangle").checked == true) {
        drawASide();
        drawBSide();
    }
    amplitudoMax();
    amplitudoMin();
    if(document.getElementById("toggleVelocity").checked == true) {
        drawVelocity();
    }
    if(document.getElementById("toggleAcceleration").checked == true) {
        drawAcceleration();
    }
    drawDiversion();
    drawObject();
    drawShadow();
}
function drawDashedLine() {
    ctx.beginPath();
    /*szaggatott vonal hossza, térkihagyás*/
    ctx.setLineDash([3, 2]);

    /*Kezdőpont helye*/
    /*x koordináta, y koordináta*/
    ctx.moveTo(0, circleY);

    /*Végpont helye*/
    /*x koordináta, y koordináta*/
    ctx.lineTo(820, circleY);
    ctx.stroke();
    ctx.setLineDash([0]);
}
function drawLine() {
    ctx.beginPath();
    ctx.moveTo(lineX, 0);
    ctx.lineTo(lineX, 800);
    ctx.stroke();
}
function drawCircle() {
    ctx.beginPath();
    ctx.arc(circleX,circleY,radius,0,2*Math.PI);
    ctx.stroke();
}
function drawRightSide() {
    ctx.beginPath();
    ctx.moveTo(circleX, circleY);
    ctx.lineTo(circleX + b, circleY - a);
    ctx.stroke();
}
function drawASide() {
    ctx.beginPath();
    ctx.moveTo(circleX + b, circleY);
    ctx.lineTo(circleX + b, circleY - a);
    ctx.stroke();
}
function drawBSide() {
    ctx.beginPath();
    ctx.moveTo(circleX, circleY);
    ctx.lineTo(circleX + b, circleY);
    ctx.stroke();
}
function drawObject() {
    ctx.beginPath();
    ctx.arc(circleX + b, circleY - a, 5, 0, 2*Math.PI);
    ctx.fillStyle = "rgb(1, 0, 255)";
    ctx.fill();
}
function drawShadow() {  
    ctx.beginPath();
    ctx.rect(lineX - 5, circleY - a - 5, 10, 10);
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fill();
}
function drawDiversion() {
    ctx.beginPath();
    ctx.moveTo(lineX, circleY);
    ctx.lineTo(lineX, circleY - a);
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0, 0, 0)";
}
function drawVelocity() {
    
    ctx.beginPath();
    ctx.moveTo(lineX - 10, circleY - a);
    ctx.lineTo(lineX - 10, circleY - a - velocity);
    ctx.strokeStyle = "rgb(0, 255, 3)";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    if(velocity > 0) {
        ctx.moveTo(lineX - 10, circleY - 20 - a - velocity);
        ctx.lineTo(lineX - 20, circleY + 10 - a - velocity);
        ctx.lineTo(lineX, circleY + 10 - a - velocity);
    } else {
        ctx.moveTo(lineX - 10, circleY + 20 - a - velocity);
        ctx.lineTo(lineX - 20, circleY - 10 - a - velocity);
        ctx.lineTo(lineX, circleY - 10 - a - velocity);
    }
    
    ctx.fillStyle = "rgb(0, 122, 1)";
    //ctx.rotate((2*Math.PI)/period * time);
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0, 0, 0)";
}
function drawAcceleration() {
    ctx.beginPath();
    ctx.moveTo(lineX + 10, circleY - a);
    ctx.lineTo(lineX + 10, circleY - a - acceleration);
    ctx.strokeStyle = "rgb(0, 30, 255)";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    if(acceleration > 0) {
        ctx.moveTo(lineX + 10, circleY - 20 - a - acceleration);
        ctx.lineTo(lineX, circleY + 10 - a - acceleration);
        ctx.lineTo(lineX + 20, circleY + 10 - a - acceleration);
    } else {
        ctx.moveTo(lineX + 10, circleY + 20 - a - acceleration);
        ctx.lineTo(lineX, circleY - 10 - a - acceleration);
        ctx.lineTo(lineX + 20, circleY - 10 - a - acceleration);
    }
    
    ctx.fillStyle = "rgb(0, 13, 110)";
    //ctx.rotate((2*Math.PI)/period * time);
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0, 0, 0)";
}
function amplitudoMax() {
    ctx.beginPath();
    ctx.rect(lineX - 5, circleY - radius - 5, 10, 10);
    ctx.fillStyle = "rgb(0, 0, 0)";
    //ctx.lineWidth = 10;
    ctx.fill();
}
function amplitudoMin() {
    //console.log("ampMin megrajzolása...");
    ctx.beginPath();
    ctx.rect(lineX - 5, circleY + radius - 5, 10, 10);
    ctx.fillStyle = "rgb(0, 0, 0)";
    //ctx.lineWidth = 10;
    ctx.fill();
    //console.log("ampMin megrajzolva!");
}
function updateValues() {
    /*document.getElementById("amplitudo").value = radius;
    document.getElementById("rezgesido").value = period;*/
    document.getElementById("fiInRad").innerHTML = roundUp(omega * time / Math.PI, 1000) + "&#120529;";
    //fi = omega * eltelt idő
    document.getElementById("fiInDeg").innerHTML = roundUp(omega * time * (180/Math.PI), 1000) + "°";
    document.getElementById("time").innerHTML = roundUp(time, 1000) + "s";
    document.getElementById("kiteres").innerHTML = roundUp(a, 1000) + "px";
    document.getElementById("sebesseg").innerHTML = roundUp(velocity, 1000) + "px/s";
    document.getElementById("gyorsulas").innerHTML = roundUp(acceleration, 1000) + "px/s^2";
}
function setNewValues() {
    if(document.getElementById("amplitudo").value != radius || document.getElementById("rezgesido").value != period || document.getElementById("fps").value != fps) {
        var tmpTime = time / period;
        fps = parseFloat(document.getElementById("fps").value);
        interval = 1000/fps;
        radius = parseFloat(document.getElementById("amplitudo").value);
        period = parseFloat(document.getElementById("rezgesido").value);

        time = tmpTime * period;
        omega = (2 * Math.PI) / period;
        centripetalVelocity = radius * (2 * Math.PI) / period;

        fi = omega * time;
        a = radius * Math.sin(fi);
        b = radius * Math.cos(fi);
        velocity = radius * omega * Math.cos(fi);
        c = centripetalVelocity * Math.sin(fi);
        acceleration = -1 * radius * Math.pow(omega, 2) * Math.sin(fi);

        updateValues();
        draw();
    }
}








function roundUp(num, precision) {
    return Math.ceil(num * precision) / precision
}
function toggleTriangle() {
    if(document.getElementById("toggleTriangle").checked == true) {
        draw();
    } else {
        draw();
    }
}
function toggleVelocity() {
    if(document.getElementById("toggleVelocity").checked == true) {
        draw();
    } else {
        draw();
    }
}
function toggleAcceleration() {
    if(document.getElementById("toggleAcceleration").checked == true) {
        draw();
    } else {
        draw();
    }
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
function zero() {
    fi = 0;
    a = radius * Math.sin(fi);
    b = radius * Math.cos(fi);
    velocity = 0;
    c = 0;
    acceleration = 0;
    time = 0;

    draw();
}
function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}