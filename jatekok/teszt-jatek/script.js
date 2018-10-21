var canvas, ctx, pattern;
var width = 1920;
var height = 1080;
var ratio = 0;
// 0-Bottom
// 1-Left
// 2-Right
// 3-Top
var character = new Image();
character.src = "img/enemy-movement-sprite.png"
var player = {
    x: 60,
    y: 60,
    width: 70,
    height: 70,
    radius: 35,
    direction: 0,
    speed: 0,
    maxSpeed: 7,
    img: character
}

var goldenCoin = new Image();
goldenCoin.src = "img/coin-sprite.png";
var coin = {
    width: 50,
    height: 50,
    radius: 25,
    img: goldenCoin
}
var coins = [];
// A negatívak a játékos kiterjedése miatt kellenek,
// A pozitívak az érmék kiterjedése miatt
//                 [-X,X,-Y,Y]
//var coinHitbox = [-40,35,-55,40];

// Az érmének hanyadik képe következik
var i = 0;
// A játékosnak hanyadik képe következik
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

var background = new Image();
background.src = "img/background-grass.png";

function startup() {
    var idle = new Audio("sound-effect/Our-Mountain_v003_Looping.mp3");
    idle.volume = 0.1;
    idle.loop = true;
    idle.play();

    canvas = document.getElementById("game");
    canvas.focus();

    setCanvasSize();
    generateCoins(1, 10, width, height);
    
    ctx = canvas.getContext("2d");
    pattern = ctx.createPattern(background, 'repeat');

    requestAnimationFrame(draw);
}

function draw() {

    drawBackground();

    player.speed = player.maxSpeed * (Date.now() - startTime)/350;
    if(player.speed > player.maxSpeed) {
        player.speed = player.maxSpeed;
    }

    // Character Movement
    if((keys["w"] == true && keys["a"] == true && keys["s"] == true && keys["d"] == true) == false) {
        // W
        if( (keys["w"] == true && keys["a"] == false && keys["s"] == false && keys["d"] == false) == true || 
            (keys["w"] == true && keys["a"] == true && keys["s"] == false && keys["d"] == true) == true) {
            if(player.y - player.speed >= 0) {
                player.y -= player.speed;
            }
            player.direction = 3;
        } else if(keys["w"] == true && keys["a"] == true && keys["s"] == false && keys["d"] == false) {
            if(player.y - player.speed/Math.sqrt(2) >= 0) {
                player.y -= player.speed/Math.sqrt(2);
            }
            if(player.x - player.speed/Math.sqrt(2) >= 0) {
                player.x -= player.speed/Math.sqrt(2);
            }
            player.direction = 3;
        } else if(keys["w"] == true && keys["a"] == false && keys["s"] == false && keys["d"] == true) {
            if(player.y - player.speed/Math.sqrt(2) >= 0) {
                player.y -= player.speed/Math.sqrt(2);
            }
            if(player.x + player.speed/Math.sqrt(2) + 60 <= width) {
                player.x += player.speed/Math.sqrt(2);
            }
            player.direction = 3;
        }
        // S
        if( (keys["w"] == false && keys["a"] == false && keys["s"] == true && keys["d"] == false) == true || 
            (keys["w"] == false && keys["a"] == true && keys["s"] == true && keys["d"] == true) == true) {
            if(player.y + player.speed + 60 <= height) {
                player.y += player.speed;
            }
            player.direction = 0;
        } else if(keys["w"] == false && keys["a"] == true && keys["s"] == true && keys["d"] == false) {
            if(player.y + player.speed/Math.sqrt(2) + 60 <= height) {
                player.y += player.speed/Math.sqrt(2);
            }
            if(player.x - player.speed/Math.sqrt(2) >= 0) {
                player.x -= player.speed/Math.sqrt(2);
            }
            player.direction = 0;
        } else if(keys["w"] == false && keys["a"] == false && keys["s"] == true && keys["d"] == true) {
            if(player.y +  player.speed/Math.sqrt(2) + 60 <= height) {
                player.y += player.speed/Math.sqrt(2);
            }
            if(player.x +  player.speed/Math.sqrt(2) + 60 <= width) {
                player.x += player.speed/Math.sqrt(2);
            }
            player.direction = 0;
        }
        // A
        if( (keys["w"] == false && keys["a"] == true && keys["s"] == false && keys["d"] == false) == true || 
            (keys["w"] == true && keys["a"] == true && keys["s"] == true && keys["d"] == false) == true) {
            if(player.x - player.speed >= 0) {
                player.x -= player.speed;
            }
            player.direction = 1;
        }
        // D
        if( (keys["w"] == false && keys["a"] == false && keys["s"] == false && keys["d"] == true) == true || 
            (keys["w"] == true && keys["a"] == false && keys["s"] == true && keys["d"] == true) == true) {
            if(player.x + player.speed + 60 <= width) {
                player.x += player.speed;
            }
            player.direction = 2;
        }
    }

    // Ez fele a képek animálásáért
    if(d%5 >= 4) {
        if(i == 9) {
            i = 0;
        } else {
            i++;
        }
    }
    if(d%8 >= 7) {
        if(q == 3) {
            q = 0;
        } else {
            q++;
        }
    }
    if(d >= 80) {
        d = 0;
    }

    //  kk = kivágás kezdete
    //  kv = kivágás vége
    //  drawImage(img,   kkX, kkY, kvX, kvY, pozX, pozY,    mérX, mérY,)

    // Ez jeleníti meg / tűnteti el az érméket.
    for(r = 0; r < coins.length; r++) {
        if((coins[r].x-player.x)*(coins[r].x-player.x) + (coins[r].y-player.y)*(coins[r].y-player.y)
        <= (player.radius+coin.radius)*(player.radius+coin.radius)) {
            coinPickupEffect.pause();
            coinPickupEffect.currentTime = 0;
            coinPickupEffect.play();
            coins.splice(r,1);
            score++;
            document.getElementById("scoreboard").innerHTML = score + " Pont";
            if(coins.length == 0) {
                happySound.play();

                setTimeout(function(){generateCoins(1, 10, width, height)}, 2000);
            }
        }
        if(r < coins.length) {
            ctx.drawImage(coin.img, 100*i,0, 100,100, coins[r].x,coins[r].y, coin.width,coin.height);
        }
    }

    // A játékos megrajzolása
    if(keys["w"] == true || keys["a"] == true || keys["s"] == true || keys["d"] == true) {
        ctx.drawImage(player.img, 54*q,54*player.direction, 54,54, player.x,player.y, player.width,player.height);
    } else {
        ctx.drawImage(player.img, 54*0,54*player.direction, 54,54, player.x,player.y, player.width,player.height);
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
        coins.push({
            x: Math.floor((Math.random() * (windoWidth-50))),
            y: Math.floor((Math.random() * (windoHeight-50)))
        });
    }
    i = 0;
    console.log("Érmék elhelyezése...");
    console.log(coins);
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
    //console.log(window.innerWidth/1920);

    if(window.innerWidth/1920 >= window.innerHeight/1080) {
        width = window.innerHeight*(16/9);
        height = window.innerHeight;
    } else if(window.innerWidth/1920 < window.innerHeight/1080) {
        width = window.innerWidth;
        height = window.innerWidth*(9/16);
    }

    document.getElementById("game").style.top = (window.innerHeight - height)/2 + "px";
    document.getElementById("game").style.left = (window.innerWidth - width)/2 + "px";
    document.getElementById("scoreboard").style.top = ((window.innerHeight - height)/2 + 10) + "px";
    document.getElementById("scoreboard").style.right = ((window.innerWidth - width)/2 + 10) + "px";
    canvas.width = width;
    canvas.height = height;
    console.log("W: " + width + " H: " + height);
    console.log("W%: " + window.innerWidth/1920);
    console.log("H%: " + window.innerHeight/1080);
}