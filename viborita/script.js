// Tomamos los elementos de HTML segun su ID y los asignamos a nuestras variables para manipularlos con JS
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOverSign = document.getElementById('gameOver');

//CONFIGURACIONES DEL JUEGO
//Tamaño del Tablero
const boardSize = 10;
//Velocidad del Juego en Milisegundos ms
const gameSpeed = 150;
//Tipos de cuadrados en el juego con sus configuraciones
const squareTypes = {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
};
//las direcciones a las que puede ir la serpiente según las flechas del teclado
const directions = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1
};

//variables que se irán modificando a medida que avance el juego
//array en donde se almacenara la serpiente y la posición que ocupa
let snake;
let score;
// se irá configurando la direccion de la serpiente según la flecha que se apriete
let direction;
//arreglo con información del tablero
let boardSquares;
//arreglo para almacenar los lugares vacios del tablero y así generar la comida en esos lugares aleatoriamente
let emptySquares;
//el intervalo en el que se moverá la serpiente
let moveInterval;

const createRandomFood = () => {
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    drawSquare(randomEmptySquare, 'foodSquare');
}

const drawSnake = () => {
    snake.forEach (square => drawSquare(square, 'snakeSquare'));
}

//es para rellenar el cuadrado del tablero
//@params
//square: posición del cuadrado
//type: tipo de cuadrado (emptySquare, snakeSquare, foodSquare)

const drawSquare = (square,type) => {
    const [row, column] = square.split('');
    boardSquares [row][column] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`);

    if (type === 'emptySquare'){
        emptySquares.push(square);
    } else {
        if (emptySquares.indexOf(square) !== -1) {
            emptySquares.splice(emptySquares.indexOf(square), 1);
        }
    }
}

const moveSnake = () => {
    const newSquare = String(
        Number(snake[snake.length - 1]) + directions[direction]).padStart(2,'0');
        const [row, column] = newSquare.split('');
        if ( newSquare < 0 || 
            newSquare > boardSize * boardSize || 
            (direction === 'ArrowRight' && column == 0) || 
            (direction === 'ArrowLeft' && column == 9 || boardSquares[row][column] === squareTypes.snakeSquare) ) {
                gameOver();
        } else {
            snake.push(newSquare);
            if (boardSquares[row][column] === squareTypes.foodSquare) {
                addFood();
            } else {
                const emptySquare = snake.shift();
                drawSquare(emptySquare, 'emptySquare')
            }
            drawSnake();
        }
}

const addFood = () => {
    score++;
    updateScore();
    createRandomFood();
}

const gameOver = () => {
    gameOverSign.style.display = 'block';
    clearInterval (moveInterval)
    startButton.disabled = false;
}

const updateScore = () => {
    //score representa el puntaje y largo de la serpiente
    scoreBoard.innerText = score;
}

const createBoard = () => {
    //se recorrerá el arreglo de dos dimensiones
    boardSquares.forEach( (row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            //variable para identificar los diferentes valores del arreglo
            const squareValue = `${rowIndex}${columnIndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        })
    })
}

const setGame = () => {
    //Para indicar que la serpiente tendrá una longitud de 4 cuadrados
    snake = ['00','01','02','03'];
    //El puntaje dependerá del largor de la serpiente
    score = snake.length;
    //Para que la serpiente inicie yendo a la derecha
    direction = 'ArrowRight';
    //Es un arreglo para formar un cuadrado de 10 por 10 y llenarlo de números 0
    boardSquares= Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));
    //console.log(boardSquares);
    //Es para limpiar el tablero en caso de que el juego se reinicie
    board.innerHTML = '';
    //Tambien se limpia el array dejandolo vacío
    emptySquares = [];
    //función para crear el tablero
    createBoard();
}

const setDirection = newDirection => {
    direction = newDirection;
}

const directionEvent = key => {
    switch (key.code) {
        case 'ArrowUp':
            direction != 'ArrowDown' && setDirection(key.code)
            break;
        case 'ArrowDown':
            direction != 'ArrowUp' && setDirection(key.code)
            break;
        case 'ArrowLeft':
            direction != 'ArrowRight' && setDirection(key.code)
            break;
        case 'ArrowRight':
            direction != 'ArrowLeft' && setDirection(key.code)
            break;
    }
}

const startGame = () => {
    setGame();
    gameOverSign.style.display = 'none';
    startButton.disabled = true;
    drawSnake();
    updateScore();
    createRandomFood();
    document.addEventListener('keydown', directionEvent);
    moveInterval = setInterval( () => moveSnake(), gameSpeed);
}

//Evento que vigila que se haga click al boton INICIAR y llama a la funcion startGame
startButton.addEventListener('click', startGame);
