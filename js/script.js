const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMessageText = document.querySelector('[data-winning-message-text]')
const winningMessage = document.querySelector('[data-winning-message]')
const restartButton = document.querySelector('[data-restart-button]')

let isCircleTurn;

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const setBoardHoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if(isCircleTurn){
        board.classList.add('circle')
    }else{
        board.classList.add('x')
    };
}

const startGame = () => {
    for(const cell of cellElements){
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once:true});
    }

    isCircleTurn = false;

    setBoardHoverClass();
    winningMessage.classList.remove('show-winning-message');
};

const endGame = (isDraw) => {
    if(isDraw){
        winningMessageText.innerHTML = "Empatou!"
    } else{
        winningMessageText.innerHTML = isCircleTurn ? 'Circulo ganhou!' : 'X ganhou!'
    };

    winningMessage.classList.add('show-winning-message');
};

const checkForWin = (currentPlayer) =>{
    return winningCombinations.some((combinations) => {
        return combinations.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every(cell =>{
        return cell.classList.contains('x') || cell.classList.contains('circle')
    });
}

function placeMark(cell, classToAdd) {
    cell.classList.add(classToAdd);
};

const swapTurns = () =>{
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();

};

const handleClick = (e) =>{
    // Colocar a marca X ou O
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);
    // Verificar por vitoria
    // Verificar por empate
    const isWin = checkForWin(classToAdd);
    const isDraw = checkForDraw();

    if(isWin){
        endGame(false)
    }else if(isDraw){
        endGame(true)
    } else {
        swapTurns();
    }
}

for(const cell of cellElements){
    cell.addEventListener('click', handleClick, {once:true});
}

startGame();

restartButton.addEventListener('click', startGame);