// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:

// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49

// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.

const playButton = document.getElementById('play-button');
const select = document.getElementById('difficulty-select');
const grid = document.getElementById('grid');
let width = `calc(100% / 10)`;
let height = `calc(100% / 10)`;
let numberSquare = 100;



select.addEventListener('change', function () {
    const selectValue = select.value;
    let row = 0;
    let col = 0;
    switch (selectValue) {
        case 'easy':
            row = 10;
            col = 10;
            break;
        case 'medium':
            row = 9;
            col = 9;
            break;
        case 'hard':
            row = 7;
            col = 7;
            break;
    }
    
    width = `calc(100% / ${col})`;
    height = `calc(100% / ${row})`;
    numberSquare = col * row;    
});
            
                   
            
            
playButton.addEventListener('click', function () {
    let point = 0;
    grid.innerHTML = '';

    for (let i = 0; i < numberSquare; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.append(i+1);
        square.style.width = width;
        square.style.height = height;
        grid.append(square);
        
        square.addEventListener('click', function() {
            if (!this.classList.contains('clicked')) {
                this.classList.add('clicked');
                point += 1;
                console.log(point);
            }
        }); 
    }

});