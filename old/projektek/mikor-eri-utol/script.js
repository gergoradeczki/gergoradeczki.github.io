var canvas, ctx, fps, interval, period, now, then, delta, time, velocityA, velocityB, startingPosA, startingPosB, posA, posB;
then = Date.now();

//képkocka per másodperc
fps = 60;
interval = 1000/fps;
time = 0;
period = 1000;
// pixel/másodperc
velocityA = 70;
velocityB = 100;

startingPosA = 200;
startingPosB = 10;

posA = 200;
posB = 10;

function setCanvas() {
    document.getElementById("sebessegA").innerHTML = velocityA + "m/s";
    document.getElementById("sebessegB").innerHTML = velocityB + "m/s";
    document.getElementById("kulonbseg").innerHTML = startingPosA - startingPosB + "m";
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
        if(posA == posB || posA < posB) {

        } else {
            draw();
        }
        
    }
}

function draw() {
    updateValues();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, 720, 400);
    ctx.lineWidth = 2;

    startingPosObjectA();
    startingPosObjectB();
    lineObjectA();
    lineObjectB();


}
function startingPosObjectA() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.arc(posA, 175, 5, 0, Math.PI * 2, true); // Outer circle
    ctx.fill();
}
function lineObjectA() {
    ctx.beginPath();
    ctx.moveTo(startingPosA, 175);
    ctx.lineTo(posA, 175);
    ctx.lineWidth = 3;

    // set line color
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.stroke();
}
function startingPosObjectB() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(0, 23, 255)";
    ctx.arc(posB, 200, 5, 0, Math.PI * 2, true); // Outer circle
    ctx.fill();
}
function lineObjectB() {
    ctx.beginPath();
    ctx.moveTo(startingPosB, 200);
    ctx.lineTo(posB, 200);
    ctx.lineWidth = 3;

    // set line color
    ctx.strokeStyle = "rgb(0, 23, 255)";
    ctx.stroke();
}
function updateValues() {
    /*document.getElementById("amplitudo").value = radius;
    document.getElementById("rezgesido").value = period;*/
    posA = startingPosA + velocityA * time;
    posB = startingPosB + velocityB * time;
    document.getElementById("time").innerHTML = roundUp(time, 1000) + "s";
}
function setNewValues() {
    if(document.getElementById("rezgesido").value != period || document.getElementById("fps").value != fps) {
        fps = parseFloat(document.getElementById("fps").value);
        interval = 1000/fps;

        updateValues();
        draw();
    }
}








function roundUp(num, precision) {
    return Math.ceil(num * precision) / precision
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