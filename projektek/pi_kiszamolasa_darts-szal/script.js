var canvas, ctx;
var i = 0;
var requestId = 0;
var padding = 0;
var width = 400;
var height = 400;
var green = 0;
var all = 0;
var pi = 0;
var randX, randY;

function setCanvas() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    
    // négyzet megrajzolása
    ctx.beginPath();
    ctx.rect(padding, padding, width, height);
    ctx.stroke();

    //kör megrajzolása
    ctx.beginPath();
    ctx.arc(width/2 + padding, height/2 + padding, width/2, 0, 2*Math.PI, false);
    ctx.stroke();

}
function animation() {
    requestId = requestAnimationFrame(animation);

    for(i = 0; i<=1000; i++) {
        // véletlenszerűen kiválasztok egy pontot
        randX = Math.floor(Math.random() * width) - width/2;
        randY = Math.floor(Math.random() * width) - width/2;

        //megnézem, benne van-e a körben
        if(randX*randX + randY*randY <= (width/2)*(width/2)) {
            green++;
            all++;
            ctx.beginPath();
            ctx.arc(randX + padding + width/2, randY + padding + width/2, 1, 0, 2*Math.PI, false);
            ctx.fillStyle = "green";
            ctx.fill();
        } else {
            all++;
            ctx.beginPath();
            ctx.arc(randX + padding + width/2, randY + padding + width/2, 1, 0, 2*Math.PI, false);
            ctx.fillStyle = "red";
            ctx.fill();
        }
    }
    // a körben levők és az összes pontok arányának a 4-szerese lesz egynelő Pi-vel
    pi = 4* (green / all);
    //console.log("Pi equals to " + pi);
    document.getElementById("pi_kozelito_ertek").innerHTML = "&#960; közelítő értéke: " + pi;
    document.getElementById("hibaszazalek").innerHTML = "Hibaszázalék: " + Math.ceil((Math.abs(Math.PI - pi)/Math.PI) * 100 * 10000)/10000 + "%";
    document.getElementById("talalatok").innerHTML = "Találatok száma: " + green;
    document.getElementById("osszes_loves").innerHTML = "Lövések száma: " + all;
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