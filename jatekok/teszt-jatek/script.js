var canvas, ctx, pattern;
var width = 0;
var height = 0;
// 0-Bottom
// 1-Left
// 2-Right
// 3-Top
var direction = 0;
var playerSize = [70,70];
var playerRadius = playerSize[0]/2;
var playerPos = [60,60];
var coinSize = [50,50];
var coinRadius = coinSize[0]/2;
var coins = [];
var coinsPos = [];
// A negatívak a játékos kiterjedése miatt kellenek,
// A pozitívak az érmék kiterjedése miatt
//                 [-X,X,-Y,Y]
//var coinHitbox = [-40,35,-55,40];
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
var happySound = new Audio("sound-effect/hi_yeah_happy.mp3");
happySound.volume = 0.2;

var coin = new Image();
coin.src = "img/coin-sprite.png";
var background = new Image();
background.src = "img/background-grass.png";
var player = new Image();
player.src = "img/enemy-movement-sprite.png";

function startup() {
    var idle = new Audio("sound-effect/Our-Mountain_v003_Looping.mp3");
    idle.volume = 0.1;
    idle.loop = true;
    idle.play();
    width = window.innerWidth;
    height = window.innerHeight;

    generateCoins(1, 10, width, height);

    // -1 mert igy nem lesz görgetősáv megjelenítve

    canvas = document.getElementById("game");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    pattern = ctx.createPattern(background, 'repeat');

    requestAnimationFrame(draw);
}

function draw() {

    drawBackground();

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
            direction = 3;
        } else if(keys["w"] == true && keys["a"] == true && keys["s"] == false && keys["d"] == false) {
            if(playerPos[1] - currentSpeed/Math.sqrt(2) >= 0) {
                playerPos[1] -= currentSpeed/Math.sqrt(2);
            }
            if(playerPos[0] - currentSpeed/Math.sqrt(2) >= 0) {
                playerPos[0] -= currentSpeed/Math.sqrt(2);
            }
            direction = 3;
        } else if(keys["w"] == true && keys["a"] == false && keys["s"] == false && keys["d"] == true) {
            if(playerPos[1] - currentSpeed/Math.sqrt(2) >= 0) {
                playerPos[1] -= currentSpeed/Math.sqrt(2);
            }
            if(playerPos[0] + currentSpeed/Math.sqrt(2) + 60 <= width) {
                playerPos[0] += currentSpeed/Math.sqrt(2);
            }
            direction = 3;
        }
        // S
        if( (keys["w"] == false && keys["a"] == false && keys["s"] == true && keys["d"] == false) == true || 
            (keys["w"] == false && keys["a"] == true && keys["s"] == true && keys["d"] == true) == true) {
            if(playerPos[1] + currentSpeed + 60 <= height) {
                playerPos[1] += currentSpeed;
            }
            direction = 0;
        } else if(keys["w"] == false && keys["a"] == true && keys["s"] == true && keys["d"] == false) {
            if(playerPos[1] + currentSpeed/Math.sqrt(2) + 60 <= height) {
                playerPos[1] += currentSpeed/Math.sqrt(2);
            }
            if(playerPos[0] - currentSpeed/Math.sqrt(2) >= 0) {
                playerPos[0] -= currentSpeed/Math.sqrt(2);
            }
            direction = 0;
        } else if(keys["w"] == false && keys["a"] == false && keys["s"] == true && keys["d"] == true) {
            if(playerPos[1] +  currentSpeed/Math.sqrt(2) + 60 <= height) {
                playerPos[1] += currentSpeed/Math.sqrt(2);
            }
            if(playerPos[0] +  currentSpeed/Math.sqrt(2) + 60 <= width) {
                playerPos[0] += currentSpeed/Math.sqrt(2);
            }
            direction = 0;
        }
        // A
        if( (keys["w"] == false && keys["a"] == true && keys["s"] == false && keys["d"] == false) == true || 
            (keys["w"] == true && keys["a"] == true && keys["s"] == true && keys["d"] == false) == true) {
            if(playerPos[0] - currentSpeed >= 0) {
                playerPos[0] -= currentSpeed;
            }
            direction = 1;
        }
        // D
        if( (keys["w"] == false && keys["a"] == false && keys["s"] == false && keys["d"] == true) == true || 
            (keys["w"] == true && keys["a"] == false && keys["s"] == true && keys["d"] == true) == true) {
            if(playerPos[0] + currentSpeed + 60 <= width) {
                playerPos[0] += currentSpeed;
            }
            direction = 2;
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
        if(q == 3) {
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
        if((coinsPos[r*2]-playerPos[0])*(coinsPos[r*2]-playerPos[0]) + (coinsPos[r*2+1]-playerPos[1])*(coinsPos[r*2+1]-playerPos[1])
        <= (playerRadius+coinRadius)*(playerRadius+coinRadius) && coins[r] == 1) {
            coinPickupEffect.pause();
            coinPickupEffect.currentTime = 0;
            coinPickupEffect.play();
            coins[r] = 0;
            coins.splice(r,1);
            coinsPos.splice(r*2,2);
            score++;
            document.getElementById("scoreboard").innerHTML = score + " Pont";
            if(coins.length == 0) {
                happySound.play();

                setTimeout(function(){generateCoins(1, 10, width, height)}, 2000);
            }
        }
        if(coins[r] == 1) {
            ctx.drawImage(coin, 100*i,0, 100,100, coinsPos[r*2],coinsPos[r*2+1], coinSize[0],coinSize[1]);
        }
    }

    // A játékos megrajzolása
    if(keys["w"] == true || keys["a"] == true || keys["s"] == true || keys["d"] == true) {
        ctx.drawImage(player, 54*q,54*direction, 54,54, playerPos[0],playerPos[1], playerSize[0],playerSize[1]);
    } else {
        ctx.drawImage(player, 54*0,54*direction, 54,54, playerPos[0],playerPos[1], playerSize[0],playerSize[1]);
    }

    d++;

    requestAnimationFrame(draw);
}

function drawBackground() {
    ctx.beginPath()
    ctx.rect(0,0,width,height);
    ctx.fillStyle = pattern;
    ctx.fill();
    ctx.closePath();
}

function generateCoins(minCoins, maxCoins, windoWidth, windoHeight) {
    console.log("generateCoins(" + minCoins + ", " + maxCoins + ", " + width + ", " + height + ")");
    coinNumber = Math.floor((Math.random() * maxCoins) + minCoins);

    for(i=0; i<coinNumber; i++) {
        coins.push(1);

        coinsPos.push(Math.floor((Math.random() * (windoWidth-50))));
        coinsPos.push(Math.floor((Math.random() * (windoHeight-50))));
    }
    i = 0;
    console.log("Érmék elhelyezése...");
    console.log(coins);
    console.log(coinsPos);
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