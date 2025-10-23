const button = document.getElementById('clicker');
const button2 = document.getElementById('clicker2');
const button3 = document.getElementById('poppingtart');
const button4 = document.getElementById('han');
const button5 = document.getElementById('lawful');
const display = document.getElementById('clickerdisplay');
const display2 = document.getElementById('clicker2display');
const absolute = document.getElementById('absolutetopoj9');

var count = 0;
var upgrade = 1;

var automationLevel = 0;
function automation() {
    count += automationLevel;
    updateDisplays();
}

const intervalId = setInterval(automation, 1000);

button.onclick = function() {
    count += upgrade;
    updateDisplays();
}
button2.onclick = function() {
    if (count < 20) {
        return;
    }
    count -= 20;
    upgrade += 1;
    updateDisplays();
}
button3.onclick = function() {
    if (count < 100) {
        return;
    }
    count -= 100;
    automationLevel += 1;
    updateDisplays();
}
button4.onclick = function() {
    if (count < 1000) {
        return;
    }
    count -= 1000;
    automationLevel += 25;
    updateDisplays();
}
button5.onclick = function() {
    if (count < 10000) {
        return;
    }
    count -= 10000;
    automationLevel += 500;
    updateDisplays();
}
function updateDisplays() {
    display.innerText = count + "";
    display2.innerText = "topoj" + upgrade;
    if (upgrade == 9) {
        absolute.hidden = false;
    } else {
        absolute.hidden = true;
    }
}