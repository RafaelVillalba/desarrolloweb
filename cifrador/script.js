const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const inputOriginal = document.getElementById('input-original');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');

//variables para probar git
const variableprueba = "Estoy creando esta variable para practicar git";
const variable2 = "Estas variables no sirven para nada";

const shifMessage = () => {
    const wordArray = [...inputOriginal.value.toUpperCase()];
    //alert(wordArray);
    printChar(0, wordArray);
}
// FUNCION RECURSIVA
const printChar = (currentLetterIndex, wordArray) => {
    //este if sirve para poder cortar con la recursion y no se convierta en un loop infinito
    //comprueba si la longitud del Arreglo coincide con el indice
    if(wordArray.length === currentLetterIndex) return;
    inputOriginal.value = inputOriginal.value.substring(1);
    const spanChar = document.createElement("span");
    resultado.appendChild(spanChar);
    animateChar(spanChar)
        .then ( () => {
            const charSinCodificar = wordArray[currentLetterIndex];
            spanChar.innerHTML = alfabeto.includes(charSinCodificar) ?
            alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) % alfabeto.length] : 
            charSinCodificar
            printChar(currentLetterIndex + 1, wordArray);
        });
}

const animateChar = spanChar => {
    let cambiosDeLetra = 0;
    return new Promise(resolve => {
        const intervalo = setInterval(() => {
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambiosDeLetra++;
            if(cambiosDeLetra === 3){
                clearInterval(intervalo);
                resolve();
            }
        }, 50);
    });
}

const submit = e => {
    e.preventDefault();
    resultado.innerHTML = '';
    shifMessage()
}

cifrador.onsubmit = submit;