var canvas, ctx;
var requestId = 0;
var width = 0;
var height = 0;
var point = [60,60];
var speed = 10;
var i = 0;
var q = 0;
var d = 0;

var keys = {
    w: false,
    s: false,
    a: false,
    d: false
};

var img = new Image();
img.src = "img/coin-sprite.png";

var player = new Image();
player.src = "img/character-sprite.png";

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

    ctx.beginPath()
    ctx.rect(0,0,width,height);
    ctx.fillStyle = "grey";
    ctx.fill();

    // Character Movement
    if((keys["w"] == true && keys["a"] == true && keys["s"] == true && keys["d"] == true) == false) {
        // W
        if( (keys["w"] == true && keys["a"] == false && keys["s"] == false && keys["d"] == false) == true || 
            (keys["w"] == true && keys["a"] == true && keys["s"] == false && keys["d"] == true) == true) {
            if(point[1] - speed >= 0) {
                point[1] -= speed;
            }
        } else if(keys["w"] == true && keys["a"] == true && keys["s"] == false && keys["d"] == false) {
            if(point[1] - speed/Math.sqrt(2) >= 0) {
                point[1] -= speed/Math.sqrt(2);
            }
            if(point[0] - speed/Math.sqrt(2) >= 0) {
                point[0] -= speed/Math.sqrt(2);
            }
            player.src = "img/character-sprite-mirrored.png";
        } else if(keys["w"] == true && keys["a"] == false && keys["s"] == false && keys["d"] == true) {
            if(point[1] - speed/Math.sqrt(2) >= 0) {
                point[1] -= speed/Math.sqrt(2);
            }
            if(point[0] + (speed)/Math.sqrt(2) + 60 <= width) {
                point[0] += speed/Math.sqrt(2);
            }
            player.src = "img/character-sprite.png";
        }
        // S
        if( (keys["w"] == false && keys["a"] == false && keys["s"] == true && keys["d"] == false) == true || 
            (keys["w"] == false && keys["a"] == true && keys["s"] == true && keys["d"] == true) == true) {
            if(point[1] + speed + 60 <= height) {
                point[1] += speed;
            }
        } else if(keys["w"] == false && keys["a"] == true && keys["s"] == true && keys["d"] == false) {
            if(point[1] + (speed)/Math.sqrt(2) + 60 <= height) {
                point[1] += speed/Math.sqrt(2);
            }
            if(point[0] - speed/Math.sqrt(2) >= 0) {
                point[0] -= speed/Math.sqrt(2);
            }
            player.src = "img/character-sprite-mirrored.png";
        } else if(keys["w"] == false && keys["a"] == false && keys["s"] == true && keys["d"] == true) {
            if(point[1] +  speed/Math.sqrt(2) + 60 <= height) {
                point[1] += speed/Math.sqrt(2);
            }
            if(point[0] +  speed/Math.sqrt(2) + 60 <= width) {
                point[0] += speed/Math.sqrt(2);
            }
            player.src = "img/character-sprite.png";
        }
        // A
        if( (keys["w"] == false && keys["a"] == true && keys["s"] == false && keys["d"] == false) == true || 
            (keys["w"] == true && keys["a"] == true && keys["s"] == true && keys["d"] == false) == true) {
            if(point[0] - speed >= 0) {
                point[0] -= speed;
            }
            player.src = "img/character-sprite-mirrored.png";
        }
        // D
        if( (keys["w"] == false && keys["a"] == false && keys["s"] == false && keys["d"] == true) == true || 
            (keys["w"] == true && keys["a"] == false && keys["s"] == true && keys["d"] == true) == true) {
            if(point[0] + speed + 60 <= width) {
                point[0] += speed;
            }
            player.src = "img/character-sprite.png";
        }
    }

    if(d >= 4) {
        if(i == 9) {
            i = 0;
            d = 0;
        } else {
            i++;
            d = 0;
        }
        if(q == 5) {
            q = 0;
        } else {
            q++;
        }
    }

    //  kk = kivágás kezdete
    //  kv = kivágás vége
    //  drawImage(img,   kkX, kkY, kvX, kvY, pozX, pozY,    mérX, mérY,)

    ctx.drawImage(img,100*i,0,100,100,500,500,50,50);
    ctx.drawImage(img,100*i,0,100,100,400,500,50,50);
    ctx.drawImage(img,100*i,0,100,100,300,500,50,50);
    ctx.drawImage(img,100*i,0,100,100,200,500,50,50);
    ctx.drawImage(img,100*i,0,100,100,100,500,50,50);
    
    if(keys["w"] == true || keys["a"] == true || keys["s"] == true || keys["d"] == true) {
        ctx.drawImage(player, 256*q,0, 256,218, point[0],point[1], 60,60);
    } else {
        ctx.drawImage(player, 256*1,0, 256,218, point[0],point[1], 60,60);
    }

    /*ctx.beginPath();
    ctx.arc(point[0],point[1],50,0,Math.PI*2,false);
    ctx.stroke();*/

    d++;

    requestId = requestAnimationFrame(draw);
}

document.addEventListener("keydown", function(e) {
    if(e.key == "a" || e.key == "ArrowLeft") {
        keys["a"] = true;
    }
    if(e.key == "d" || e.key == "ArrowRight") {
        keys["d"] = true;
    }
    if(e.key == "s" || e.key == "ArrowDown") {
        keys["s"] = true;
    }
    if(e.key == "w" || e.key == "ArrowUp") {
        keys["w"] = true;
    }
});

document.addEventListener("keyup", function(e) {
    if(e.key == "a" || e.key == "ArrowLeft") {
        keys["a"] = false;
    }
    if(e.key == "d" || e.key == "ArrowRight") {
        keys["d"] = false;
    }
    if(e.key == "s" || e.key == "ArrowDown") {
        keys["s"] = false;
    }
    if(e.key == "w" || e.key == "ArrowUp") {
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