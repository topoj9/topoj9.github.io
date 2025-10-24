const button = document.getElementById('clicker');
const button2 = document.getElementById('clicker2');
const button3 = document.getElementById('poppingtart');
const button4 = document.getElementById('han');
const button5 = document.getElementById('bung');

const display = document.getElementById('clickerdisplay');
const display2 = document.getElementById('clicker2display');
const display3 = document.getElementById('clicker3display');

const absolute = document.getElementById('absolutetopoj9');

var count = 0;
var upgrade = 1;
var upgradePrice = 20;
var na = 0;

var poppingtartCost = 100;

var automationLevel = 0;
function automation() {
    count += automationLevel*upgrade;
    updateDisplays();
}

const intervalId = setInterval(automation, 1000);

button.onclick = function() {
    count += upgrade * 100;
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
    updateDisplays();
}
button5.onclick = function() {
    if (na < 10) {
        return;
    }
    na -= 10;
    upgrade = Math.round(upgrade * 1.5);

}

function updateDisplays() {
    display.innerText = count + "";
    display2.innerText = "topoj" + upgrade;
    display3.innerText = "NA: " + na

    button2.innerText = "+1 topoj level\n" + upgradePrice;
    button3.innerText = "buy a popping tart\n" + poppingtartCost;

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