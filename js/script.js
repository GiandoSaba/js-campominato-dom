// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:

// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49

// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const playButton = document.getElementById('play-button');
const select = document.getElementById('difficulty-select');
const grid = document.getElementById('grid');

function selectChoice() {
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
}

function playButtonFunction(){
    let width = '';
    let height = '';
    let numberSquare = 0;
    selectChoice();
    const bombNumber = 16;
    let point = 0;
    const bombArray = createBombArray(numberSquare);
    console.log(bombArray);
    grid.innerHTML = '';

    for (let i = 0; i < numberSquare; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.append(i + 1);
        // if (bombArray.includes(i + 1)) {
        //     square.classList.add('bomb');
        // }
        square.style.width = width;
        square.style.height = height;
        grid.append(square);

        square.addEventListener('click', squareClickFunction);
    }
    
    function squareClickFunction() {
        console.log('click');
        const numSquare = parseInt(this.innerText);
        if (bombArray.includes(numSquare)) {
            const allSquare = document.querySelectorAll('.square');
            for (let i = 0; i < allSquare.length; i++) {
                if (bombArray.includes(parseInt(allSquare[i].innerText))) {
                    allSquare[i].classList.add('bomb');
                    allSquare[i].classList.add('clicked');
                } 
            }
            const result = `<h2 class="result"> HAI PERSO. Totale punti: ${point}</h2>`;
            grid.innerHTML += result;
        } else if (!this.classList.contains('clicked') && !this.classList.contains('bomb')) {
            this.classList.add('clicked');
            point += 1;
            if (point == numberSquare - bombNumber) {
                const result = `<h2 class="result"> HAI VINTO. Totale punti: ${point}</h2>`;
                grid.innerHTML += result;
            }
        }
    }

    function createBombArray(numSquare){
        const bombArray = [];
        for (let i = 0; i < bombNumber; i++) {
            let number = getRandomIntInclusive(1,numSquare);
            while (bombArray.includes(number)) {
                number = getRandomIntInclusive(1, numSquare);
            }
            bombArray.push(number);
        }
    
        return bombArray;
    }
    
}

playButton.addEventListener('click', playButtonFunction);
select.addEventListener('change', selectChoice);