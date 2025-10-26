const button = document.getElementById('clicker');
const button2 = document.getElementById('clicker2');
const button3 = document.getElementById('poppingtart');
const button4 = document.getElementById('han');
const button5 = document.getElementById('bung');
const buyGurt = document.getElementById("buyGurt");
const sellGurt = document.getElementById("sellGurt");

const display = document.getElementById('clickerdisplay');
const display2 = document.getElementById('clicker2display');
const display3 = document.getElementById('clicker3display');
const gurtPriceDisplay = document.getElementById('gurtprice');
const popdisp = document.getElementById('poptartdisplay');
const gurtDisplay = document.getElementById("gurtDisplay");

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

var automationLevel = 0;
function automation() {
    count += automationLevel*upgrade;
    updateDisplays();
}
function updateGurts() {
    advanceMarket(1);
    updateDisplays();
}

const intervalId = setInterval(automation, 1000);
const intervalId2 = setInterval(updateGurts, 5000);

button.onclick = function() {
    count += upgrade;
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
    na += Math.round(count/100);
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
    upgrade = Math.round(upgrade * 1.5);

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
    display.innerText = count + "";
    display2.innerText = "topoj" + upgrade;
    display3.innerText = "NA: " + na
    popdisp.innerText = automationLevel + " popping tarts"
    gurtDisplay.innerText = "Gurt: " + gurts;

    var gurtCost = currentGurtCost();

    button.innerText = "+" + upgrade + " topoj social credit"
    button2.innerText = "+" + "1" + " topoj level\n" + upgradePrice;
    button3.innerText = "buy a popping tart\n" + poppingtartCost;
    button5.innerText = "buy a bung\n" + bungCost + "NA";
    buyGurt.innerText = "Buy\n" + Math.ceil(currentGurtCost()*gurtAmount.value);
    sellGurt.innerText = "Sell\n" + Math.ceil(currentGurtCost()*gurtAmount.value);

    gurtPriceDisplay.innerText = "GURT PRICE: " + Math.ceil(gurtCost);

    if (count >= 1000) {
        button4.innerText = "do a han?\n(min 1000)\nyou will earn " + Math.round(count/100) + " NA";
    } else {
        button4.innerText = "do a han?\n(min 1000)\n";
    }

    if (upgrade == 9) {
        absolute.hidden = false;
    } else {
        absolute.hidden = true;
    }
}