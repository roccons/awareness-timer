// valores pore defecto
var how_many_minutes = 20;
var how_many_seconds = 0;

// variables
var remaining_seconds, remaining_minutes;
var num_frase_anterior;
var myTimeout;
var frases_array;

// elementos del dom
var dom_countdown_m = document.getElementById("countdown_m");
var dom_countdown_s = document.getElementById("countdown_s");
var dom_mysound = document.getElementById("mysound");
var dom_totalminutes = document.getElementById("totalminutes");
var dom_totalseconds = document.getElementById("totalseconds");
var dom_totaltime = document.getElementById("totaltime");
var dom_frases = document.getElementById("frases");

//botones
var btn_startcount = document.getElementById("startcount");
var btn_stopcount = document.getElementById("stopcount");
var btn_testsound = document.getElementById("testsound");

// construye arreglo de frases
$(document).ready(function() {
    $.get('frases.txt', function(data) {
        frases_array = data.split('\n');
        dom_frases.innerHTML=eligefrase();
    });
});

// valores iniciales
dom_totalminutes.value=how_many_minutes;
dom_totalseconds.value=how_many_seconds;

// devuelve una cadena de dos dígitos
function formato(valor) {
	valor=""+valor;
	if(valor.length<2) {
		return "0" + valor;
	} else {
		return valor;
	}
}

// elige una frase al azar
function eligefrase() {
	var cual;
	do {
		cual = Math.floor((Math.random() * frases_array.length));
	} while (cual === num_frase_anterior);
	num_frase_anterior = cual;
	return frases_array[cual];
}

// comienza un ciclo de conteo
function startCountdown () {
	remaining_minutes = dom_totalminutes.value;
	remaining_seconds = dom_totalseconds.value;
	document.title="▶ Activo";
	dom_totaltime.style.display="none";
	countdown.style.display="inline-block";
	btn_startcount.style.display="none";
	btn_stopcount.style.display="block";
	dom_countdown_m.innerHTML=dom_totalminutes.value;
	dom_countdown_s.innerHTML=formato(dom_totalseconds.value);
	dom_frases.innerHTML=eligefrase();
	myCountdown();
}

// detiene conteo
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

// cada segundo que pasa...
function myCountdown () {
	myTimeout = setTimeout(function (){
		if (remaining_seconds>0) {
			remaining_seconds--;
			dom_countdown_s.innerHTML=formato(remaining_seconds);
			document.title="▶ " + remaining_minutes + ":" + formato(remaining_seconds);
			myCountdown();
		} else if(remaining_minutes>0) {
			remaining_minutes--;
			remaining_seconds=59;
			dom_countdown_m.innerHTML=remaining_minutes;
			dom_countdown_s.innerHTML=formato(remaining_seconds);
			document.title="▶ " + remaining_minutes + ":" + formato(remaining_seconds);
			myCountdown();
		} else {
			dom_mysound.currentTime=0;
			dom_mysound.play();
			startCountdown();
		}
	}, 1000);
}

// asigna acciones a los botones
startcount.onclick = startCountdown;
stopcount.onclick = stopCountdown;

// botón de probar sonido
btn_testsound.onclick = function () { 
	if(dom_mysound.currentTime>0 && dom_mysound.currentTime<30) {
		dom_mysound.pause();
		dom_mysound.currentTime=0;
	} else {
		dom_mysound.play();
	}
};
