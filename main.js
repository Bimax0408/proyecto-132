function activar(foto) {
    if (foto == "zoologico") {
        localStorage.setItem("foto","zoologico.jpg")
    }
    else if (foto=="carretera") {
        localStorage.setItem("foto","carretera.png")
    }
    else if (foto=="habitacion") {
        localStorage.setItem("foto","habitacion.jpeg")
    }
    else if (foto=="mascotas") {
        localStorage.setItem("foto","mascotas.jpg")
    }
    window.location="index2.html"
}

var listaobjetos = [];
var estatus = false;


function setup() {
    canvas = createCanvas(800, 600);
    background("rgb(175, 255, 151)");
    canvas.center();
    Img.resize(800, 600);
    reconocimiento = ml5.objectDetector("cocossd", listo);
};

function listo() {
    console.log("El modelo esta cargado");
    reconocimiento.detect(Img, result);
};

function result(error, object) {
    if (!error) {
        console.log(object);
        estatus = true;
        listaobjetos = object;
    };
};

function preload() {
    Img = loadImage(localStorage.getItem("foto"));

};

function draw() {
    image(Img, 0, 0, 800, 600);
    if (estatus) {
        for (var f= 0;f <listaobjetos.length; f++) {
            strokeWeight(6);
            textSize(15);
            fill("blue");
            textStyle(BOLD);
            porcentaje = Math.round(listaobjetos[f].confidence * 100)
            mensaje = listaobjetos[f].label + " " + porcentaje + "%"
            text(mensaje, listaobjetos[f].x, listaobjetos[f].y - 10);
            noFill();
            stroke("lime");
            strokeWeight(3);
            rect(listaobjetos[f].x, listaobjetos[f].y, listaobjetos[f].width, listaobjetos[f].height);
        }
        document.getElementById("detectado").innerHTML="🔍"+listaobjetos.length+" Objetos detectados 🔍"
    };
};

function regresar() {
    window.location="index.html"
}