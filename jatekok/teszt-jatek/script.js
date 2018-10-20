var canvas, ctx;
var requestId = 0;
var width = 0;
var height = 0;
var point = [60,60];
var object = [60,600];
var speed = 10;

var keys = {
    w: false,
    s: false,
    a: false,
    d: false
};

function startup() {
    // -1 mert igy nem lesz görgetősáv megjelenítve
    width = window.innerWidth -1;
    height = window.innerHeight -1;

    canvas = document.getElementById("game");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    requestAnimationFrame(draw);
}

function draw() {
    requestId = requestAnimationFrame(draw);

    ctx.beginPath()
    ctx.rect(0,0,width,height);
    ctx.fillStyle = "grey";
    ctx.fill();

    if((keys["w"] == true && keys["a"] == true && keys["s"] == true && keys["d"] == true) == false) {
        // W
        if( (keys["w"] == true && keys["a"] == false && keys["s"] == false && keys["d"] == false) == true || 
            (keys["w"] == true && keys["a"] == true && keys["s"] == false && keys["d"] == true) == true) {
            point[1] -= speed;
        } else if(keys["w"] == true && keys["a"] == true && keys["s"] == false && keys["d"] == false) {
            point[1] -= speed/Math.sqrt(2);
            point[0] -= speed/Math.sqrt(2);
        } else if(keys["w"] == true && keys["a"] == false && keys["s"] == false && keys["d"] == true) {
            point[1] -= speed/Math.sqrt(2);
            point[0] += speed/Math.sqrt(2);
        }
        // S
        if( (keys["w"] == false && keys["a"] == false && keys["s"] == true && keys["d"] == false) == true || 
            (keys["w"] == false && keys["a"] == true && keys["s"] == true && keys["d"] == true) == true) {
            point[1] += speed;
        } else if(keys["w"] == false && keys["a"] == true && keys["s"] == true && keys["d"] == false) {
            point[1] += speed/Math.sqrt(2);
            point[0] -= speed/Math.sqrt(2);
        } else if(keys["w"] == false && keys["a"] == false && keys["s"] == true && keys["d"] == true) {
            point[1] += speed/Math.sqrt(2);
            point[0] += speed/Math.sqrt(2);
        }
        // A
        if( (keys["w"] == false && keys["a"] == true && keys["s"] == false && keys["d"] == false) == true || 
            (keys["w"] == true && keys["a"] == true && keys["s"] == true && keys["d"] == false) == true) {
            point[0] -= speed;
        }
        // D
        if( (keys["w"] == false && keys["a"] == false && keys["s"] == false && keys["d"] == true) == true || 
            (keys["w"] == true && keys["a"] == false && keys["s"] == true && keys["d"] == true) == true) {
            point[0] += speed;
        }
    }

    ctx.beginPath();
    ctx.arc(point[0],point[1],50,0,Math.PI*2,false);
    ctx.stroke();

    if(keys["w"] == true || keys["a"] == true || keys["s"] == true || keys["d"] == true) {
        object[0] += speed;
    }
    
    ctx.beginPath();
    ctx.arc(object[0],object[1],50,0,Math.PI*2,false);
    ctx.stroke();
}

document.addEventListener("keydown", function(e) {
    if(e.key == "a") {
        keys["a"] = true;
    }
    if(e.key == "d") {
        keys["d"] = true;
    }
    if(e.key == "s") {
        keys["s"] = true;
    }
    if(e.key == "w") {
        keys["w"] = true;
    }
});

document.addEventListener("keyup", function(e) {
    if(e.key == "a") {
        keys["a"] = false;
    }
    if(e.key == "d") {
        keys["d"] = false;
    }
    if(e.key == "s") {
        keys["s"] = false;
    }
    if(e.key == "w") {
        keys["w"] = false;
    }
});

function setCanvasSize() {
    width = window.innerWidth -1;
    height = window.innerHeight -1;

    canvas.width = width;
    canvas.height = height;
    console.log("resize");
}