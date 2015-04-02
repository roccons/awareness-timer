var how_many_minutes = 20;
var how_many_seconds = 0;
how_many_seconds += how_many_minutes*60;

var remaining_seconds, myTimeout;
var isCounting = false;

// obtengo los tags
var dom_countdown = document.getElementById("countdown");
var dom_mysound = document.getElementById("mysound");
var dom_startcount = document.getElementById("startcount");
var dom_stopcount = document.getElementById("stopcount");
var dom_testsound = document.getElementById("testsound");
var dom_totalseconds = document.getElementById("totalseconds");
var dom_totaltime = document.getElementById("totaltime");


dom_countdown.innerHTML=how_many_seconds;
dom_totalseconds.value=how_many_seconds;

function startCountdown () {
	remaining_seconds = dom_totalseconds.value;
	document.title="▶ Activo";
	dom_totaltime.style.display="none";
	dom_countdown.style.display="inline-block";
	dom_startcount.style.display="none";
	dom_stopcount.style.display="block";
	dom_countdown.innerHTML=dom_totalseconds.value;
	myCountdown();
}

function stopCountdown () {
	document.title="… Detenido";
	dom_totaltime.style.display="inline-block";
	dom_countdown.style.display="none";
	dom_startcount.style.display="inline-block";
	dom_stopcount.style.display="none";
	clearTimeout(myTimeout);
	dom_countdown.innerHTML=dom_totalseconds.value;
}

function myCountdown () {
	myTimeout = setTimeout(function (){
		if (--remaining_seconds>0) {
			dom_countdown.innerHTML=remaining_seconds;
			myCountdown();
		} else {
			dom_mysound.play();
			startCountdown();
		}
	}, 1000);
}

startcount.onclick = startCountdown;
stopcount.onclick = stopCountdown;
dom_testsound.onclick = function () { 
	dom_mysound.play();
};
