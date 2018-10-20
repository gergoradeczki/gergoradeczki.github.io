var canvas, ctx, pattern;
var requestId = 0;
var width = 0;
var height = 0;
var playerSize = [60,60];
var playerPos = [60,60];
var coinSize = [50,50];
// A negatívak a játékos kiterjedése miatt kellenek,
// A pozitívak az érmék kiterjedése miatt
//                 [-X,X,-Y,Y]
var coinHitbox = [-40,35,-55,40];
var coins = [];
var maxCoinNumber = 30;
var coinsPos = [];
var currentSpeed = 0;
var maxSpeed = 10;

// Hanyadik képe az érmének következik
var i = 0;
// Hanyadik képe a játékosnak következik
var q = 0;
// Lassítja a képváltoztatást
var d = 0;

var startTime = 0;
var score = 0;

var keys = {
    w: false,
    s: false,
    a: false,
    d: false
};

var coinPickupEffect = new Audio("sound-effect/coin-pickup.wav");
coinPickupEffect.volume = 0.25;

var coin = new Image();
coin.src = "img/coin-sprite.png";
var background = new Image();
background.src = "img/background-grass.png";
var player = new Image();
player.src = "img/character-sprite-mirrored.png";
player.src = "img/character-sprite.png";

function startup() {
    var idle = new Audio("sound-effect/Our-Mountain_v003_Looping.mp3");
    idle.volume = 0.1;
    idle.loop = true;
    idle.play();
    width = window.innerWidth;
    height = window.innerHeight;

    var coinNumber = Math.floor((Math.random() * maxCoinNumber) + 1);

    for(i=0; i<coinNumber; i++) {
        coins.push(1);

        coinsPos.push(Math.floor((Math.random() * (width-50))));
        coinsPos.push(Math.floor((Math.random() * (height-50))));
    }
    i = 0;
    console.log(coins);
    console.log(coinsPos);

    // -1 mert igy nem lesz görgetősáv megjelenítve

    canvas = document.getElementById("game");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    pattern = ctx.createPattern(background, 'repeat');

    requestId = requestAnimationFrame(draw);
}

function draw() {

    ctx.beginPath()
    ctx.rect(0,0,width,height);
    ctx.fillStyle = pattern;
    ctx.fill();

    currentSpeed = maxSpeed * (Date.now() - startTime)/350;
    if(currentSpeed > maxSpeed) {
        currentSpeed = maxSpeed;
    }

    // Character Movement
    if((keys["w"] == true && keys["a"] == true && keys["s"] == true && keys["d"] == true) == false) {
        // W
        if( (keys["w"] == true && keys["a"] == false && keys["s"] == false && keys["d"] == false) == true || 
            (keys["w"] == true && keys["a"] == true && keys["s"] == false && keys["d"] == true) == true) {
            if(playerPos[1] - currentSpeed >= 0) {
                playerPos[1] -= currentSpeed;
            }
        } else if(keys["w"] == true && keys["a"] == true && keys["s"] == false && keys["d"] == false) {
            if(playerPos[1] - currentSpeed/Math.sqrt(2) >= 0) {
                playerPos[1] -= currentSpeed/Math.sqrt(2);
            }
            if(playerPos[0] - currentSpeed/Math.sqrt(2) >= 0) {
                playerPos[0] -= currentSpeed/Math.sqrt(2);
            }
            player.src = "img/character-sprite-mirrored.png";
        } else if(keys["w"] == true && keys["a"] == false && keys["s"] == false && keys["d"] == true) {
            if(playerPos[1] - currentSpeed/Math.sqrt(2) >= 0) {
                playerPos[1] -= currentSpeed/Math.sqrt(2);
            }
            if(playerPos[0] + currentSpeed/Math.sqrt(2) + 60 <= width) {
                playerPos[0] += currentSpeed/Math.sqrt(2);
            }
            player.src = "img/character-sprite.png";
        }
        // S
        if( (keys["w"] == false && keys["a"] == false && keys["s"] == true && keys["d"] == false) == true || 
            (keys["w"] == false && keys["a"] == true && keys["s"] == true && keys["d"] == true) == true) {
            if(playerPos[1] + currentSpeed + 60 <= height) {
                playerPos[1] += currentSpeed;
            }
        } else if(keys["w"] == false && keys["a"] == true && keys["s"] == true && keys["d"] == false) {
            if(playerPos[1] + currentSpeed/Math.sqrt(2) + 60 <= height) {
                playerPos[1] += currentSpeed/Math.sqrt(2);
            }
            if(playerPos[0] - currentSpeed/Math.sqrt(2) >= 0) {
                playerPos[0] -= currentSpeed/Math.sqrt(2);
            }
            player.src = "img/character-sprite-mirrored.png";
        } else if(keys["w"] == false && keys["a"] == false && keys["s"] == true && keys["d"] == true) {
            if(playerPos[1] +  currentSpeed/Math.sqrt(2) + 60 <= height) {
                playerPos[1] += currentSpeed/Math.sqrt(2);
            }
            if(playerPos[0] +  currentSpeed/Math.sqrt(2) + 60 <= width) {
                playerPos[0] += currentSpeed/Math.sqrt(2);
            }
            player.src = "img/character-sprite.png";
        }
        // A
        if( (keys["w"] == false && keys["a"] == true && keys["s"] == false && keys["d"] == false) == true || 
            (keys["w"] == true && keys["a"] == true && keys["s"] == true && keys["d"] == false) == true) {
            if(playerPos[0] - currentSpeed >= 0) {
                playerPos[0] -= currentSpeed;
            }
            player.src = "img/character-sprite-mirrored.png";
        }
        // D
        if( (keys["w"] == false && keys["a"] == false && keys["s"] == false && keys["d"] == true) == true || 
            (keys["w"] == true && keys["a"] == false && keys["s"] == true && keys["d"] == true) == true) {
            if(playerPos[0] + currentSpeed + 60 <= width) {
                playerPos[0] += currentSpeed;
            }
            player.src = "img/character-sprite.png";
        }
    }

    // Ez fele a képek animálásáért
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

    // Ez jeleníti meg / tűnteti el az érméket.
    for(r = 0; r < coins.length; r++) {
        if(coinsPos[r*2]+coinHitbox[0] < playerPos[0] && playerPos[0] <= coinsPos[r*2]+coinHitbox[1]
        && coinsPos[r*2+1]+coinHitbox[2] < playerPos[1] && playerPos[1] <= coinsPos[r*2+1]+coinHitbox[3]
        && coins[r] == 1) {
            //console.log(r + ". érmét megérintetted!");
            coinPickupEffect.pause();
            coinPickupEffect.currentTime = 0;
            coinPickupEffect.play();
            coins[r] = 0;
            coins.splice(r,1);
            coinsPos.splice(r*2,2);
            score++;
            document.getElementById("scoreboard").innerHTML = score + " Pont";
        }
        if(coins[r] == 1) {
            ctx.drawImage(coin, 100*i,0, 100,100, coinsPos[r*2],coinsPos[r*2+1], coinSize[0],coinSize[1]);
        }
    }

    // A játékos megrajzolása
    if(keys["w"] == true || keys["a"] == true || keys["s"] == true || keys["d"] == true) {
        ctx.drawImage(player, 256*q,0, 256,218, playerPos[0],playerPos[1], playerSize[0],playerSize[1]);
    } else {
        ctx.drawImage(player, 256*1,0, 256,218, playerPos[0],playerPos[1], playerSize[0],playerSize[1]);
    }

    d++;

    requestId = requestAnimationFrame(draw);
}


// Gomblenyomás figyelése
document.addEventListener("keydown", function(e) {
    if(e.key == "a" || e.key == "A" || e.key == "ArrowLeft") {
        keys["a"] = true;
    }
    if(e.key == "d" || e.key == "D" || e.key == "ArrowRight") {
        keys["d"] = true;
    }
    if(e.key == "s" || e.key == "S" || e.key == "ArrowDown") {
        keys["s"] = true;
    }
    if(e.key == "w" || e.key == "W" || e.key == "ArrowUp") {
        keys["w"] = true;
    }
    if(startTime == 0) {
        startTime = Date.now();
    }
});

// Gombelengedés figyelése
document.addEventListener("keyup", function(e) {
    if(e.key == "a" || e.key == "A" || e.key == "ArrowLeft") {
        keys["a"] = false;
    }
    if(e.key == "d" || e.key == "D" || e.key == "ArrowRight") {
        keys["d"] = false;
    }
    if(e.key == "s" || e.key == "S" || e.key == "ArrowDown") {
        keys["s"] = false;
    }
    if(e.key == "w" || e.key == "W" || e.key == "ArrowUp") {
        keys["w"] = false;
    }
    if(keys["w"] == false && keys["a"] == false && keys["s"] == false && keys["d"] == false) {
        startTime = 0;
    }
});

// A kép újraméretezése
function setCanvasSize() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
    console.log("resize");
}