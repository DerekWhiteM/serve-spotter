class Game {
    static MAX_SPEED = 10;
    static MIN_SPEED = 1;

    #frequency = 1;
    #rounds = 1;
    #round = 1;
    #serveDirection;
    #speed = 1;
    #start = null;
    #end = null;
    #ballId;
    #scoreboard;
    #isRunning = false;

    constructor(ballId, scoreboard) {
        this.#ballId = ballId;
        this.#scoreboard = scoreboard;
    }

    getFrequency() {
        return this.#frequency;
    }

    reset() {
        this.#round = 1;
        this.#start = null;
        this.#end = null;
        this.#isRunning = false;
        this.#scoreboard.reset();
    }

    return(direction) {
        let ms;
        if (!this.#isRunning || this.#end !== null) {
            return null;
        } else if (direction === this.#serveDirection) {
            this.#end = Date.now();
            ms = this.#end - this.#start;
        } else {
            this.#end = Date.now();
            ms = 5000;
        }
        this.#scoreboard.addScore(ms);
        if (this.#round > this.#rounds) {
            this.#isRunning = false;
            this.#scoreboard.postAverageScore();
        }
        return ms;
    }

    setFrequency(frequency) {
        this.#frequency = frequency;
    }

    setSpeed(speed) {
        this.#speed = speed;
    }

    setRounds(rounds) {
        this.#rounds = rounds;
    }

    serve() {
        const frame = () => {
            if (this.#end) {
                clearInterval(id);
                elem.style.top = initTop;
                elem.style.left = initLeft;
            } else if (pos >= 210) {
                clearInterval(id);
                elem.style.top = initTop;
                elem.style.left = initLeft;
                this.return();
                if (this.#round <= this.#rounds) {
                    setTimeout(() => this.serve(), this.getFrequency());
                }
            } else {
                pos += this.#speed;
                top += 4 * this.#speed;
                direction === "deuce" ? (left += this.#speed) : (left -= this.#speed);
                elem.style.top = top + "px";
                elem.style.left = left + "px";
            }
        };
        if (!this.#isRunning || this.#round > this.#rounds) {
            return;
        }
        const randomZeroOrOne = Math.round(Math.random());
        const direction = randomZeroOrOne === 0 ? "deuce" : "ad";
        this.#serveDirection = direction;
        let id = null;
        const elem = document.getElementById(this.#ballId);
        const initTop = elem.style.top;
        const initLeft = elem.style.left;
        let pos = 0;
        let top = 0;
        let left = 202;
        clearInterval(id);
        this.#start = Date.now();
        this.#end = null;
        id = setInterval(frame, 10);
        this.#round++;
    }

    start() {
        this.reset();
        this.#isRunning = true;
    }
}
