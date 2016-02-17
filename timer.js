// default values
var how_many_minutes = 20;
var how_many_seconds = 0;
var sentences_file = 'sentences.txt';
var sentences_file = 'frases.txt';

// variables
var remaining_seconds, remaining_minutes;
var num_frase_anterior;
var myTimeout;
var frases_array;

// dom elements
var dom_countdown_m = document.getElementById("countdown_m");
var dom_countdown_s = document.getElementById("countdown_s");
var dom_mysound = document.getElementById("mysound");
var dom_totalminutes = document.getElementById("totalminutes");
var dom_totalseconds = document.getElementById("totalseconds");
var dom_totaltime = document.getElementById("totaltime");
var dom_frases = document.getElementById("frases");

// buttons
var btn_startcount = document.getElementById("startcount");
var btn_stopcount = document.getElementById("stopcount");
var btn_testsound = document.getElementById("testsound");

// builds the sentences array
$(document).ready(function() {
    $.get(sentences_file, function(data) {
        frases_array = data.split('\n');
        dom_frases.innerHTML=eligefrase();
    });
});

// updates initial values with those set by the user
if(typeof(Storage) !== "undefined") {
	if(localStorage.getItem("how_many_minutes") !== null) {
		how_many_minutes = localStorage.getItem("how_many_minutes");
		how_many_seconds = localStorage.getItem("how_many_seconds");
	}
}

// shows initial values
dom_totalminutes.value=how_many_minutes;
dom_totalseconds.value=how_many_seconds;

// keeps user defined values
function save_preferred_time() {
	if(typeof(Storage) !== "undefined") {
		localStorage.setItem("how_many_minutes", dom_totalminutes.value);
		localStorage.setItem("how_many_seconds", dom_totalseconds.value);
	}
}
dom_totalminutes.onblur = save_preferred_time;
dom_totalseconds.onblur = save_preferred_time;

// returns a two digits string
function formato(valor) {
	valor=""+valor;
	if(valor.length<2) {
		return "0" + valor;
	} else {
		return valor;
	}
}

// chose a random sentece
function eligefrase() {
	var cual;
	do {
		cual = Math.floor((Math.random() * frases_array.length));
	} while (cual === num_frase_anterior);
	num_frase_anterior = cual;
	return frases_array[cual];
}

// starts a counting cicle
function startCountdown () {
	remaining_minutes = dom_totalminutes.value;
	remaining_seconds = Math.floor(dom_totalseconds.value/10)*10;
	document.title="▶ Activo";
	dom_totaltime.style.display="none";
	countdown.style.display="inline-block";
	btn_startcount.style.display="none";
	btn_stopcount.style.display="block";
	dom_countdown_m.innerHTML=dom_totalminutes.value;
	dom_countdown_s.innerHTML=formato(remaining_seconds);
	dom_frases.innerHTML=eligefrase();
	myCountdown();
}

// stops counting
function stopCountdown () {
	document.title="… Detenido";
	dom_totaltime.style.display="inline-block";
	countdown.style.display="none";
	btn_startcount.style.display="inline-block";
	btn_stopcount.style.display="none";
	clearTimeout(myTimeout);
	dom_mysound.pause();
	dom_mysound.currentTime=0;
	$('#progreso > div').css('width', '0%');
}

// get progress percentage
function getProgreso () {
	var remaining_total = (parseInt(remaining_minutes) * 60 + parseInt(remaining_seconds));
	var total_total = (parseInt(how_many_minutes) * 60 + parseInt(how_many_seconds));
	console.log((total_total - remaining_total)*100/total_total);
	return (total_total - remaining_total)*100/total_total;
}

// each interval completed...
function myCountdown () {
	myTimeout = setTimeout(function (){
		if (remaining_seconds>=10) {
			remaining_seconds-=10;
			dom_countdown_s.innerHTML=formato(remaining_seconds);
			document.title="▶ " + remaining_minutes + ":" + formato(remaining_seconds);
			myCountdown();
		} else if(remaining_minutes>0) {
			remaining_minutes--;
			remaining_seconds=50;
			dom_countdown_m.innerHTML=remaining_minutes;
			dom_countdown_s.innerHTML=formato(remaining_seconds);
			document.title="▶ " + remaining_minutes + ":" + formato(remaining_seconds);
			myCountdown();
		} else {
			dom_mysound.currentTime=0;
			dom_mysound.play();
			startCountdown();
		}
		// updates progress bar
		$('#progreso > div').css('width', getProgreso() + '%');
	}, 10000);
}

// asigns actions to buttons
startcount.onclick = startCountdown;
stopcount.onclick = stopCountdown;

// makes a listener so that the enter key also starts counting
dom_totaltime.onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      startCountdown();
      return false;
    }
};

// test sound button
btn_testsound.onclick = function () { 
	if(dom_mysound.currentTime>0 && dom_mysound.currentTime<30) {
		dom_mysound.pause();
		dom_mysound.currentTime=0;
	} else {
		dom_mysound.play();
	}
};
