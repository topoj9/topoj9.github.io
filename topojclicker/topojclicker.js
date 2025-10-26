const button = document.getElementById('clicker');
const button2 = document.getElementById('clicker2');
const button3 = document.getElementById('poppingtart');
const button4 = document.getElementById('han');
const button5 = document.getElementById('bung');
const buyGurt = document.getElementById("buyGurt");
const sellGurt = document.getElementById("sellGurt");
const popHams = document.getElementById('pophams');
const fent = document.getElementById('fent');

const display = document.getElementById('clickerdisplay');
const display2 = document.getElementById('clicker2display');
const display3 = document.getElementById('clicker3display');
const gurtPriceDisplay = document.getElementById('gurtprice');
const popdisp = document.getElementById('poptartdisplay');
const gurtDisplay = document.getElementById("gurtDisplay");
const bungDisplay = document.getElementById('bungs');
const pophamDisplay = document.getElementById('pophamdisplay');

var allDisplays = document.getElementsByTagName("h2");
var allDisplayText = [];
var allPs = document.getElementsByTagName("p");
var allPText = [];
var allButtons = document.getElementsByTagName("button");
var allButtonText = [];

const gurtAmount = document.getElementById("gurtAmount");
const canvas = document.getElementById("gurtCanvas");
const absolute = document.getElementById('absolutetopoj9');

var count = 0;
var upgrade = 1;
var na = 0;
var gurts = 0;

var upgradePrice = 20;
var poppingtartCost = 100;
var bungCost = 10;
var bungs = 0;
var poppedHams = 0;

var fentActive = false;
var fentTimer = 0;

var automationLevel = 0;
function automation() {
    count += automationLevel*getMulti(true);

    if (fentActive) {
        fentTimer += 1;
        if (fentTimer > 20) {
            fentActive = false;
            for (let i = 0; i < allPs.length; i++) {
                allPs[i].innerText = allPText[i];
            }
            for (let i = 0; i < allButtons.length; i++) {
                allButtons[i].innerText = allButtonText[i];
            }
            for (let i = 0; i < allDisplays.length; i++) {
                allDisplays[i].innerText = allDisplayText[i];
            }
        }
    }

    updateDisplays();
}
function updateGurts() {
    advanceMarket(1);
    updateDisplays();
}
function getMulti(isTart) {
    let multi = upgrade;
    if (!isTart) {
        multi *= Math.pow(1.5, bungs);
    }
    if (fentActive) {
        multi *= 5;
    }
    return Math.round(multi);
}

const intervalId = setInterval(automation, 1000);
const intervalId2 = setInterval(updateGurts, 5000);

button.onclick = function() {
    count += getMulti(false);
    updateDisplays();
}
button2.onclick = function() {
    if (count < upgradePrice) {
        return;
    }
    count -= upgradePrice;
    upgrade += 1;
    upgradePrice = Math.round(upgradePrice*1.5);
    updateDisplays();
}
button3.onclick = function() {
    if (count < poppingtartCost) {
        return;
    }
    count -= poppingtartCost;
    automationLevel += 1;
    poppingtartCost = Math.round(poppingtartCost*10);
    updateDisplays();
}
button4.onclick = function() {
    if (count < 1000) {
        return;
    }
    let amtNA = count/100;
    if (fentActive) {
        amtNA *= 5;
    }
    na += Math.round(amtNA);
    count = 0;
    upgrade = 1;
    upgradePrice = 20;
    updateDisplays();
}
button5.onclick = function() {
    if (na < bungCost) {
        return;
    }
    na -= bungCost;
    bungCost = Math.round(bungCost * 4);
    //upgrade = Math.round(upgrade * 1.5);
    bungs += 1;
    updateDisplays();

}
buyGurt.onclick = function() {
    var gurtPrice = currentGurtCost();
    var amt = parseInt(gurtAmount.value);
    var totalPrice = Math.ceil(amt*gurtPrice);
    if (count < totalPrice) {
        return;
    }
    count -= totalPrice;
    gurts += amt;
    updateDisplays();
}
sellGurt.onclick = function() {
    var gurtPrice = currentGurtCost();
    var amt = parseInt(gurtAmount.value);
    var totalPrice = Math.ceil(amt*gurtPrice);
    if (amt > gurts) {
        return;
    }
    count += totalPrice;
    gurts -= amt;
    updateDisplays();
}
popHams.onclick = function() {
    if (na < 10) {
        return;
    }
    var maxVal = Math.ceil(na/10);
    if (fentActive) {
        maxVal *= 5;
    }
    poppedHams += Math.round(Math.random()*maxVal);
    
    bungs = 0;
    na = 0;
    updateDisplays();
}
fent.onclick = function() {
    if (poppedHams < 2 || fentActive) {
        return;
    }
    poppedHams -= 2;
    fentActive = true;
    fentTimer = 0;

    for (let i = 0; i < allPs.length; i++) {
        allPText[i] = allPs[i].innerText;
    }
    for (let i = 0; i < allButtons.length; i++) {
        allButtonText[i] = allButtons[i].innerText;
    }
    for (let i = 0; i < allDisplays.length; i++) {
        allDisplayText[i] = allDisplays[i].innerText;
    }

    updateDisplays();
}
gurtAmount.onchange = function() {
    updateDisplays();
}

var heights = []
function advanceMarket(amtTimes) {
    for (let i = 0; i<amtTimes; i++) {
        heights.shift();
        heights.push(calculatePrice(heights[heights.length-1]));
        draw();
    }
}
function calculatePrice(lastValue) {
    return Math.min(Math.max(lastValue + (Math.random()-0.5)*20.0, 0), canvas.height);
}
function currentGurtCost(){
    return heights[heights.length-1];
}
var stockMarketScale = 5;
function draw() {
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      

      ctx.fillStyle = "white"; // Set fill color to blue
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      //ctx.fillRect(50, 50, 150, 100); // Draw a filled rectangle at (50,50) with width 150 and height 100
      var lastHeight = canvas.height/2;
      ctx.moveTo(0, lastHeight);
      for (let i = 0; i < canvas.width/stockMarketScale; i++) {
        var newHeight = lastHeight;

        if (heights.length < i+1) {
            newHeight = calculatePrice(lastHeight);
            newHeight = Math.max(newHeight, 0);
            newHeight = Math.min(newHeight, canvas.height);
            heights[i] = newHeight;
        } else {
            newHeight = heights[i];
        }

        ctx.lineTo(i*stockMarketScale, canvas.height-newHeight)
        ctx.moveTo(i*stockMarketScale, canvas.height-newHeight);
        lastHeight = newHeight;
      }
      ctx.stroke();
    }
  }
  
  // Call the draw function when the page loads
  window.onload = draw;

function updateDisplays() {
    if (!fentActive) {
    display.innerText = count + "";
    display2.innerText = "topoj" + upgrade;
    display3.innerText = "NA: " + na
    popdisp.innerText = automationLevel + " popping tarts"
    gurtDisplay.innerText = "Gurt: " + gurts;
    pophamDisplay.innerText = "Popped hams: " + poppedHams;

    var gurtCost = currentGurtCost();

    button.innerText = "+" + getMulti(false) + " topoj social credit"
    button2.innerText = "+" + "1" + " topoj level\n" + upgradePrice;
    button3.innerText = "buy a popping tart\n" + poppingtartCost;
    button5.innerText = "buy a bung\n" + bungCost + "NA";
    buyGurt.innerText = "Buy\n" + Math.ceil(currentGurtCost()*gurtAmount.value);
    sellGurt.innerText = "Sell\n" + Math.ceil(currentGurtCost()*gurtAmount.value);

    bungDisplay.innerText = "Bungs: " + bungs;
    gurtPriceDisplay.innerText = "GURT PRICE: " + Math.ceil(gurtCost);

    if (count >= 1000) {
        button4.innerText = "do a han?\n(min 1000)\nyou will earn " + Math.round(count/100) + " NA";
    } else {
        button4.innerText = "do a han?\n(min 1000)\n";
    }
    } else {
        randomizeText();
    }

    if (upgrade == 9) {
        absolute.hidden = false;
    } else {
        absolute.hidden = true;
    }
}
let chars = "qwertyuiop[]|asdfghjkl;':}{?/.>,<mnbvcxzQWERTYUIOPASDFGHJKLZXCVBNM   ";
function randomText(amt) {
    
    var newString = "";
    for (let i = 0; i < amt; i++) {
        var charIndex = Math.round(Math.random()*(chars.length-1));
        newString = newString + chars.charAt(charIndex);
    }
    return newString;

}
function randomizeText() {
    for (let i = 0; i < allDisplays.length; i++) {
        allDisplays[i].innerText = randomText(10);
    }
    for (let i = 0; i < allPs.length; i++) {
        allPs[i].innerText = randomText(50);
    }
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].innerText = randomText(15);
    }
}