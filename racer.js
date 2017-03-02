var revsElement = document.getElementById('revs');
var speedElement = document.getElementById('speed');
var heatElement = document.getElementById('heat');
var currentGear = document.getElementById('currentGear');
var zeroToSixty = document.getElementById('zeroToSixty')

var acceleratorPressed = false;
var clutchPressed = false;

var idleRevs = 900;
var maxRevs = 9000;
var redline = 5000;
var heat = 0;
var rpm = idleRevs;
var speed = 0;
var gear = 0;
var tyreSize = 15;
var gearRatio = 1.1;
var axleRatio = 4;
var idleHeat = 45;

var startTime = 0;
var recorded = false;

var tick = new CustomEvent("tick");
setInterval(function() {document.dispatchEvent(tick);}, 50);

document.addEventListener('tick', function() {
  if (heat > idleHeat) {
    heat -= 0.5;
  }
  if(rpm > redline) {
    heat += (rpm - 5000) / 100;
  }
  if(heat > 200) {
    gear = 0;
    speed = 0;
    rpm = 900;
    heat = idleHeat;
  }
  if(rpm < 890) {
    gear = 0;
    speed = 0;
    rpm = 900;
  }
  if(speed == 0) {
    startTime = Date.now();
  }
  if(speed > 100) {
    if(!recorded){
      endTime = Date.now();
      zeroToSixty.innerHTML = new Date(endTime - startTime).getMinutes() + ":" + new Date(endTime - startTime).getSeconds() + ":" + new Date(endTime - startTime).getMilliseconds();
      recorded = true;
    }
  }
  if(acceleratorPressed) {
    rpm += 95 - (gear * 18);
  } else {
    if(rpm > idleRevs) rpm -= 50 - (gear * 5);
    if(speed < 0) speed = 0;
  }
  var newSpeed = rpm * 60 * 3.14 * gear * tyreSize * 0.00001 * 0.6 / (gearRatio * axleRatio);
  if(newSpeed > speed) {
    if(!clutchPressed && gear > 0) {
      speed = newSpeed;
    }
  } else {
    speed = newSpeed;
  }
  revsElement.innerHTML = 'RPM: ' + rpm;
  speedElement.innerHTML = 'Speed: ' + speed;
  currentGear.innerHTML = 'Gear: ' + gear == 0 ? 'N' : gear;
  heatElement.innerHTML = 'Heat: ' + heat;
});

document.addEventListener('keydown', function(event) {
  if(event.keyCode == 32) {
    acceleratorPressed = true;
  }
  if(event.keyCode == 16) {
    clutchPressed = true;
  }
  if(clutchPressed && acceleratorPressed) {
    rpm += 95;
  }
  if(event.keyCode == 20) {
    if(clutchPressed) {
      gear = 0;
    }
  }
  if(event.keyCode == 81) {
    if(clutchPressed) {
      if(gear > 1) {
        rpm += 1000;
      }
      gear = 1;
    }
  }
  if(event.keyCode == 65) {
    if(clutchPressed) {
      if(gear > 2) {
        rpm += 1000;
      }
      if(gear < 2) {
        rpm -= 1000;
      }
      gear = 2;
    }
  }
  if(event.keyCode == 87) {
    if(clutchPressed) {
      if(gear > 3) {
        rpm += 1000;
      }
      if(gear < 3) {
        rpm -= 1000;
      }
      gear = 3;
    }
  }
  if(event.keyCode == 83) {
    if(clutchPressed) {
      if(gear > 4) {
        rpm += 1000;
      }
      if(gear < 4) {
        rpm -= 1000;
      }
      gear = 4;
    }
  }
  if(event.keyCode == 69) {
    if(clutchPressed) {
      if(gear < 5) {
        rpm -= 1000;
      }
      gear = 5;
    }
  }
  if(event.keyCode == 70) {
    startTime = Date.now();
    recorded = false;
  }
});

document.addEventListener('keyup', function(event) {
  if(event.keyCode == 32) {
    acceleratorPressed = false;
  }
  if(event.keyCode == 16) {
    clutchPressed = false;
  }
});
