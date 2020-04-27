'use strict';
var gameMode = '';
var choice = '';
var turn = '';
var moveCount = 0;
var win = false;
var chooseSideClasses = document.getElementById('choose-side').classList;
var resultContainer = document.getElementById('score');
var reset = document.getElementById('reset-btn');
var fields = document.getElementsByClassName('gamefield');
var playersStyle = document.getElementById('choose-game-mode').classList;
var players = document.getElementsByClassName('game-mode');
var ticOrTac = document.getElementsByClassName('player-btn');
reset.addEventListener('click', function(){
    clearBoard();
    playersStyle.add('choose-game-mode');
    playersStyle.remove('hide');
    chooseSideClasses.add('choose-side');
      chooseSideClasses.remove('hide');
    });

for (var u=0; u<players.length; u++){
    players[u].addEventListener('click', function(){
      gameMode = this.value;
      console.log(gameMode);
      console.log(typeof gameMode);
      playersStyle.add('hide');
      playersStyle.remove('choose-game-mode');
    });
}

for (var j = 0; j < ticOrTac.length; j++) {
    ticOrTac[j].addEventListener('click', function() {
        choice = this.innerText;
        turn = choice;
        //hide choosing field
      chooseSideClasses.add('hide');
      chooseSideClasses.remove('choose-side');
        console.log(choice); // works

      });
}

for (var i = 0; i < fields.length; i++) {
    fields[i].position = i + 1;
    fields[i].state = 'empty';
    fields[i].addEventListener('click', function() {
        // checkBoard();
         console.log(win);
        if (this.state == 'empty' && !win) {
            this.state = 'occupied';
            this.textContent = turn;
            checkBoard();
             if(!win){
                    if(gameMode=='1P'){
                     moveCount++; //for my turn and living opponent turn
                    changeTurn();
                    computerTurn();
                    moveCount++;
                    checkBoard();
                    changeTurn();

                 }
            if(gameMode=='2P'){
                moveCount++;
               checkBoard();
            changeTurn();

        }
        }
        }
    });
}

function computerTurn() {//WORKS

    var ran = Math.floor(Math.random() * fields.length);
    console.log(ran);
    if (fields[ran].state == 'empty') {
        fields[ran].state = 'occupied';
        fields[ran].textContent = turn;
        return;
    } else if(moveCount<9){return computerTurn();
            }else return;


}

function changeTurn() {//WORKS
    console.log('Moves: ',moveCount);
    if (turn == 'X') {
        return turn = 'O';
    } else return turn = 'X';
}

function checkBoard() {//WORKS
    for (var i = 0; i < 3; i++) {
        if (fields[i].state == 'occupied') {
            //checking vertical rows
            if (fields[i].textContent == fields[i + 3].textContent && fields[i + 3].textContent == fields[i + 6].textContent) {
                resultContainer.textContent = fields[i].textContent + ' Won';
                console.log(resultContainer);
                win = true;

            }
            //checking horizontal rows
            if (fields[3 * i].textContent == fields[3 * i + 1].textContent && fields[3 * i + 1].textContent == fields[3 * i + 2].textContent && fields[3 * i].state == 'occupied') {
                resultContainer.textContent = fields[3 * i].textContent +' Won';
                console.log(resultContainer);
                win = true;

            }

        }
    }
    //checking diagonals
    if (fields[4].state == 'occupied') {
        if (fields[0].textContent == fields[4].textContent && fields[4].textContent == fields[8].textContent) {
            resultContainer.textContent = fields[4].textContent + ' Won';
            console.log(resultContainer);
            win = true;

        }
        if (fields[2].textContent == fields[4].textContent && fields[4].textContent == fields[6].textContent) {
            resultContainer.textContent = fields[4].textContent + ' Won';
            console.log(resultContainer);
            win = true;
            }

         console.log(win);

    }
    if(moveCount>=9){
        resultContainer.classList.remove('hide');
        resultContainer.textContent = "IT'S A DRAW!";
        setTimeout(clearBoard, 1000);
        //auto reset function timeout
    }
     if(win){
         console.log(resultContainer.classList);
    resultContainer.classList.remove('hide');
    setTimeout(clearBoard, 1000);
 //auto reset function timeout

    }

}

function clearBoard() {
    console.log('try to clear');
    var arr = Array.from(fields);
    //get to beofre changing class to select side
    //Clear choosing between 1 and 2 ticOrTac
    //Clear every box
    win = false;
    moveCount = 0;
    arr.forEach(function(e) {
        e.textContent = '';
        e.state = 'empty';
    });
    resultContainer.classList.add('hide');

}
