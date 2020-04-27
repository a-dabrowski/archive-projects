class TimerController {
    constructor(element, initTime, display) {
        this.initTime = initTime;
        this.el = element;
        this.time = initTime;
        this.timerCountingState = false; // false for not counting, true for counting
        this.display = display;
    }

    addTime(timeToAdd) {
        this.time = this.time + 60;
    }

    minusTime() {
        if (this.time <= 60) {
            this.time = 0;
        } else {
            this.time = this.time - 60;
        }
    }

    toggleTimer() {
        if (this.timerCountingState) {
            this.timerCountingState = false;
        } else {
            this.timerCountingState = true;
        }

        //dispatchEvent toggle
    }

    countTime() {
        this.counter = setInterval(() => {
            //maybe check state here
            this.timerCountingState = true;
            this.updateTimer();
            this.time--;
        }, 1000);
    }

    stopTime() {
        clearInterval(this.counter);
        this.timerCountingState = false;
    }

    updateTimer() {
        this.display.innerHTML = `<h1>${this.interpretTime()}</h1>`;
    }

    interpretTime() {
        //TO DO case where minutes is higher than 60
        let num = this.time;
        if (num <= 0) {
            this.stopTime();
            return "0:00";
        } // switch to other type pomodoro / break
        let minutes = Math.floor(num / 60);
        let seconds = num % 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return `${minutes}:${seconds}`;
    }

    reset() {
        this.time = this.initTime;
        this.updateTimer();
    }
}

(function () {
    const display = document.getElementById("timer");
    const app = document.getElementById("pomodoro-clock");
    const timer = new TimerController(app, 1500, display); //Init time 5 minutes
    const startBtn = document.getElementById("start");
    const stopBtn = document.getElementById("stop");
    const addTimeBtn = document.getElementById("add");
    const minusTimeBtn = document.getElementById("minus");
    const resetBtn = document.getElementById("reset");

    startBtn.addEventListener("click", function () {
        timer.countTime();
        console.log(timer.interpretTime());
    });

    stopBtn.addEventListener("click", function () {
        timer.stopTime();
    });

    addTimeBtn.addEventListener("click", function () {
        if (!timer.timerCountingState) {
            timer.addTime();
            timer.updateTimer();
        }
    });

    minusTimeBtn.addEventListener("click", function () {
        if (!timer.timerCountingState) {
            timer.minusTime();
            timer.updateTimer();
        }
    });

    resetBtn.addEventListener("click", function () {
        if (!timer.timerCountingState) {
            timer.reset();
        }
    });

    timer.updateTimer();
})();