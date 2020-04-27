'use strict';
const powerSwitch = document.getElementById('pwr-switch');
const strictSwitch = document.getElementById('strict-switch');
const roundCounter = document.getElementById('round-counter');
const startButton = document.getElementById('start-button');
const gameButtons = document.querySelectorAll('.game-btn');
const strictLamp = document.querySelector('div.strict');
const soundsURL = [
	'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
	'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
	'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
	'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
];

const soundPlayers = soundsURL.map((el) => {
	return new Audio(el);
});

const state = {
	strict: false,
	power: false,
	sequencePlaying: false,
	playerTurn: false,
	sequence: [Math.floor(Math.random() * 4)],
	//sequence: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //for testing
	step: 0,

};

function sequencePlayer(sequence, sounds) {

	state.playerTurn = false;
	powerSwitch.disabled = true;
	//prevent turning game off during sequence - input still works - needs to be disabled
	for (let i = 0; i < sequence.length; i++) {
		setTimeout(() => {
			// plasy sounds[sequence[i]];
			sounds[sequence[i]].play();
			console.log('play', [i]);
			//add adequate btn class _active and setTimeout to turn it off
			highlightButton(gameButtons[sequence[i]]);
			if (i == sequence.length - 1) {
				state.playerTurn = true; // turn on buttons on last sound
				powerSwitch.disabled = false;
			}
		}, 800 * i);
	}
}

powerSwitch.addEventListener('click', () => {
	//turn on logic
	if(state.sequencePlaying == false){
		state.power = state.power ? clearGame() : true;
		strictSwitch.disabled = state.power ? false : true;
	}
});

strictSwitch.addEventListener('click', () => {
	if (state.power) {
		state.strict = state.strict ? false : true;
	}
});

startButton.addEventListener('click', () => {
	if (state.power && !state.playerTurn) { //doesn't let user start multiple times
		sequencePlayer(state.sequence, soundPlayers);
		updateCounter(state.sequence.length);
	}
});

gameButtons.forEach(function (el) {
	el.addEventListener('click', () => {
		if (state.playerTurn === true && state.power === true) {
			highlightButton(el);
			soundPlayers[el.id].play();
			//change class to 
			//check if pressed btn is good
			//function for checking
			if (el.id == state.sequence[state.step]) { //dont use strict compare because el.id is string
				state.step++;
				console.log(state.step);
				//if not last of sequence then current number++
				if (state.sequence.length == state.step) {
					if (state.sequence.length == 20) {
						clearGame();
						notifier('You have won the game! Now reseting game...');
						// logic for declaring winner and reseting game
					} else {
						//generate new button
						state.sequence.push(Math.floor(Math.random() * 4));
						updateCounter(state.sequence.length);
						state.step = 0;
						console.log(state.sequence);
						setTimeout(() => {
							sequencePlayer(state.sequence, soundPlayers);
						}, 750);
					}
				}
			} else {
				if (state.strict) {
					//reset game
					state.sequence = [];
					state.sequence.push(Math.floor(Math.random() * 4));
					state.step = 0;
					//update counter
					updateCounter(state.sequence.length)
					notifier("You've made a mistake! Reseting game...");
				} else {
					state.step = 0;
					state.playerTurn = false;
					notifier("You've made a mistake! Try again!");
					//otherwise state is set too late because of the timeout on plating sequence
				}
			}
		}
	});
});

function highlightButton(btn) {
	btn.classList.add('game-btn_active');
	setTimeout(() => {
		btn.classList.remove('game-btn_active');
	}, state.playerTurn ? 100 : 500); //faster highlight when user is playing but slower during sequence show //timeout has to be a bit lower than loop timeout in order to highltight same buttons properly

}

function clearGame() {
	state.strict = false;
	state.power = false;
	state.playerTurn = false;
	state.sequence = [Math.floor(Math.random() * 4)];
	state.step = 0;
	updateCounter('--');
	strictSwitch.checked = false;
}

function notifier(text) {
	const notifyWindow = document.getElementsByClassName('notifier')[0];

	notifyWindow.classList.add('notifier-active');
	notifyWindow.textContent = text;

	setTimeout(() => {
		notifyWindow.classList.remove('notifier-active');;
		notifyWindow.textContent = '';
		sequencePlayer(state.sequence, soundPlayers);
	}, 5500);
}

function updateCounter(num) {
	roundCounter.children[1].textContent = num;
}
