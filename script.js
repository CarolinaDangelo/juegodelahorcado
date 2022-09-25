var palabras = ['MURCIELAGO', 'RINOCERONTE','CHUPACABRAS', 'JIRAFA', 'BALLENA', 'JAGUAR', 'COCODRILO', 'GOLONDRINA', 'JABALI', 'ELEFANTE'];
var tablero = document.getElementById('horca').getContext('2d');
var letras = [];
var palabraCorrecta = ""; 
var palabraSecreta = "";
var errores = 8;
var botonNuevoJuego = document.getElementById('btn-nuevoJuego');
var botonDesistir = document.getElementById('btn-desistir');
var bienvenida = document.querySelector(".bienvenida");
var leyendaGanado = document.querySelector(".ganaste");
var leyendaPerdido = document.querySelector(".perdiste");
var canvas2 = document.querySelector(".canvas2");
var aciertos = 0;

botonNuevoJuego.onclick = comenzarJuego;
botonDesistir.onclick = juegoPerdido;


function escogerPalabra(){
    palabraSecreta = palabras[Math.floor(Math.random()*palabras.length)]
    return palabraSecreta;  
}

function dibujarHorca(){
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.strokeStyle = "#FFFFFF"
    tablero.beginPath()
    tablero.moveTo(50, 420)
    tablero.lineTo(350, 420)
    tablero.moveTo(120, 420)
    tablero.lineTo(120, 50)
    tablero.moveTo(120, 50)
    tablero.lineTo(280, 50)
    tablero.moveTo(280, 50)
    tablero.lineTo(280, 100)
    tablero.stroke()
    tablero.closePath()
}

function dibujarLineas(){
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.strokeStyle = "#FFFFFF"
    tablero.beginPath()
    

    var ancho=400/palabraSecreta.length;
    for (let i = 0; i < palabraSecreta.length; i++){
            tablero.moveTo(50+(ancho*i), 490)
            tablero.lineTo(70+(ancho*i), 490)
    }
    tablero.stroke()
    tablero.closePath()
}

function escribirLetraCorrecta(index){
    tablero.font = 'bold 35px Arial'
    tablero.width = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.fillStyle = "#FFFFFF"

    var ancho=400/palabraSecreta.length;
    tablero.fillText(palabraSecreta[index], 50+(ancho*index), 480)
}

function escribirLetraIncorrecta(letra, errorsLeft){
    tablero.font = 'bold 30px Arial'
    tablero.width = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.fillStyle = "#FFFFFF"

    tablero.fillText(letra, 50+(30*(10-errorsLeft)), 540,40)
}

function verificarLetraClicada(key){
    if(letras.length<1 || letras.indexOf(key)<0){
        
        letras.push(key)
        return false
    }
    else{
        letras.push(key)
        return true
        }
    }

function adicionarLetraCorrecta(i) {
    palabraCorrecta += palabraSecreta[i].toUpperCase()
}   

function adicionarLetraIncorrecta(letter){
   if (palabraSecreta.indexOf(letter)<=0){
    errores-=1
   } 
}

document.onkeydown = (e) => {
    let letra=e.key.toUpperCase()
    if (letra.match(/[^A-ZÑ]$/i)){
        return
    }
    if ( !verificarLetraClicada(e.key)){
     if (palabraSecreta.includes(letra)){
        console.log(letra)
        adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
        for (let i=0; i<palabraSecreta.length; i++){
            if (palabraSecreta[i]===letra){
                escribirLetraCorrecta(i)
                aciertos+=1;
                if (aciertos == palabraSecreta.length){
                    canvas2.classList.add("ocultar")
                     leyendaGanado.classList.remove("ocultar")
                    
                }
            }
        }
    }
    else {
        if (!verificarLetraClicada(e.key)) return
        adicionarLetraIncorrecta(letra)
        escribirLetraIncorrecta(letra, errores)
        console.log(errores)
        switch (errores) {
            case 7:
                dibujarCabeza();
                break;
            case 6:
                dibujarCuerpo();
                break;
            case 5:
                dibujarPiernaIzq();
                break;
            case 4:
                dibujarPieIzq();
                break;
            case 3:
                dibujarPiernaDer();
                break;
            case 2:
                dibujarPieDer();
                break;
            case 1:
                dibujarBrazoIzq();
                break;
            case 0:
                dibujarBrazoDer();
                juegoPerdido();
                break;    
        } 
    }

  } 

}


function dibujarCabeza(){
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.fillStyle = '#FFFFFF'
    tablero.strokeStyle = "#FFFFFF"
    tablero.beginPath()
    tablero.arc(280, 130, 25, 0, 2 * Math.PI, false);
    tablero.fill();
    tablero.stroke()
    tablero.closePath()
}

function dibujarCuerpo(){
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.strokeStyle = "#FFFFFF"
    tablero.beginPath()
    tablero.moveTo(280, 160)
    tablero.lineTo(280, 250)
    tablero.stroke()
    tablero.closePath()
}

function dibujarPiernaIzq(){
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.strokeStyle = "#FFFFFF"
    tablero.beginPath()
    tablero.moveTo(280, 250)
    tablero.lineTo(250, 320)
    tablero.stroke()
    tablero.closePath()
}

function dibujarPieIzq(){
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.strokeStyle = "#FFFFFF"
    tablero.beginPath()
    tablero.moveTo(250, 320)
    tablero.lineTo(240, 320)
    tablero.stroke()
    tablero.closePath()
}

function dibujarPiernaDer(){
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.strokeStyle = "#FFFFFF"
    tablero.beginPath()
    tablero.moveTo(280, 250)
    tablero.lineTo(310, 320)
    tablero.stroke()
    tablero.closePath()
}

function dibujarPieDer(){
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.strokeStyle = "#FFFFFF"
    tablero.beginPath()
    tablero.moveTo(310, 320)
    tablero.lineTo(320, 320)
    tablero.stroke()
    tablero.closePath()
}

function dibujarBrazoIzq(){
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.strokeStyle = "#FFFFFF"
    tablero.beginPath()
    tablero.moveTo(280, 160)
    tablero.lineTo(250, 220)
    tablero.stroke()
    tablero.closePath()
}

function dibujarBrazoDer(){
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.strokeStyle = "#FFFFFF"
    tablero.beginPath()
    tablero.moveTo(280, 160)
    tablero.lineTo(310, 220)
    tablero.stroke()
    tablero.closePath()
}

function juegoPerdido(){
    canvas2.classList.add("ocultar")
    leyendaPerdido.classList.remove("ocultar")
    leyendaGanado.classList.add("ocultar")
}

function comenzarJuego(){
    bienvenida.classList.add("ocultar")
    canvas2.classList.remove("ocultar")
    leyendaPerdido.classList.add("ocultar")
    leyendaGanado.classList.add("ocultar")
    tablero.clearRect (0, 0, 1000, 860,)
    dibujarLineas(escogerPalabra())
    dibujarHorca()
    letras = [];
    errores=8;
    aciertos=0;
}