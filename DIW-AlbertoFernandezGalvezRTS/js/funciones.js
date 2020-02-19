var sel;
sel=$(document);
sel.ready(inicializarEventos);

function inicializarEventos(){
    var sel;
    sel=$("#cancelar");
    sel.click(cancelarPremium);
}
function cancelarPremium(){
    var sel=$("#premium");
    sel.css("display", "none");
}

function resultadoCuestionario(){
	var sel=$("#cuestionario");
	sel.css("display", "none");
	var sel=$(".bubble");
	sel.css("display", "none");

	var aleatorio =  Math.floor(Math.random()*7);
	var sel=$("#resultados");
	sel.css("display", "block")
	sel.attr("src", "img/galeria/"+aleatorio+".png");
	var sel=$("#volver-intentar");
	sel.css("display", "block");
}
function volverIntentar(){	
	location.reload();
}

function registro(){
	var sel=$("#identificacion");
	sel.css("display", "block");

}

function cancelar(){
	var sel=$("#identificacion");
	sel.css("display", "none");
}




function activarVideo01(){
	var sel=$("#captura01");
	sel.css("display", "none");
	var sel=$("#video01");
	sel.css("display", "flex");
}
function activarVideo02(){
	var sel=$("#captura02");
	sel.css("display", "none");
	var sel=$("#video02");
	sel.css("display", "flex");
}
function activarVideo03(){
	var sel=$("#captura03");
	sel.css("display", "none");
	var sel=$("#video03");
	sel.css("display", "flex");
}

function cambiar(){
    var pdrs = document.getElementById('file-upload').files[0].name;
    document.getElementById('info').innerHTML = pdrs;
}