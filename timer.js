var how_many_minutes = 20;
var how_many_seconds = 0;

var remaining_seconds, myTimeout;
var isCounting = false;

// obtengo los tags
var countdown_s = document.getElementById("countdown_s");
var dom_mysound = document.getElementById("mysound");
var btn_startcount = document.getElementById("startcount");
var btn_stopcount = document.getElementById("stopcount");
var btn_testsound = document.getElementById("testsound");
var dom_totalminutes = document.getElementById("totalminutes");
var dom_totalseconds = document.getElementById("totalseconds");
var dom_totaltime = document.getElementById("totaltime");


countdown_s.innerHTML=how_many_seconds;
dom_totalminutes.value=how_many_minutes;
dom_totalseconds.value=how_many_seconds;

function formato(valor) { // devuelve una cadena de dos dígitos
	valor=""+valor;
	if(valor.length<2) {
		return "0" + valor;
	} else {
		return valor;
	}
}


function startCountdown () {
	remaining_minutes = dom_totalminutes.value;
	remaining_seconds = dom_totalseconds.value;
	document.title="▶ Activo";
	dom_totaltime.style.display="none";
	countdown.style.display="inline-block";
	btn_startcount.style.display="none";
	btn_stopcount.style.display="block";
	countdown_m.innerHTML=dom_totalminutes.value;
	countdown_s.innerHTML=formato(dom_totalseconds.value);
	myCountdown();
}

function stopCountdown () {
	document.title="… Detenido";
	dom_totaltime.style.display="inline-block";
	countdown.style.display="none";
	btn_startcount.style.display="inline-block";
	btn_stopcount.style.display="none";
	clearTimeout(myTimeout);
	dom_mysound.pause();
	dom_mysound.currentTime=0;
}

function myCountdown () {
	myTimeout = setTimeout(function (){
		if (remaining_seconds>0) {
			remaining_seconds--;
			countdown_s.innerHTML=formato(remaining_seconds);
			document.title="▶ " + remaining_minutes + ":" + formato(remaining_seconds);
			myCountdown();
		} else if(remaining_minutes>0) {
			remaining_minutes--;
			remaining_seconds=59;
			countdown_m.innerHTML=remaining_minutes;
			countdown_s.innerHTML=formato(remaining_seconds);
			document.title="▶ " + remaining_minutes + ":" + formato(remaining_seconds);
			myCountdown();
		} else {
			dom_mysound.currentTime=0;
			dom_mysound.play();
			startCountdown();
		}
	}, 1000);
}

startcount.onclick = startCountdown;
stopcount.onclick = stopCountdown;
btn_testsound.onclick = function () { 
	if(dom_mysound.currentTime>0 && dom_mysound.currentTime<30) {
		dom_mysound.pause();
		dom_mysound.currentTime=0;
	} else {
		dom_mysound.play();
	}
};
