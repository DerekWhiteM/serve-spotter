import { Scoreboard } from "./scoreboard";

export class Game {
    static MAX_SPEED = 10;
    static MIN_SPEED = 1;

    #frequency = 1;
    #rounds = 1;
    #round = 1;
    #serveDirection: string | undefined;
    #speed = 1;
    #start: number | null = null;
    #end: number | null = null;
    #ballId = "ball";
    #courtId = "court";
    #scoreboard;
    #isRunning = false;

    constructor(scoreboard: Scoreboard) {
        this.#scoreboard = scoreboard;
        document.addEventListener("keydown", event => {
            if (event.key === "ArrowLeft") {
                this.return("ad");
            } else if (event.key === "ArrowRight") {
                this.return("deuce");
            }
        });
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

    return(direction: string | null) {
        let ms;
        if (!this.#isRunning || this.#end !== null) {
            return null;
        } else if (direction === this.#serveDirection) {
            this.#end = Date.now();
            ms = this.#end - (this.#start || 0);
        } else {
            this.#end = Date.now();
            ms = 5000;
        }
        this.#scoreboard.addScore(ms);
        if (this.#round > this.#rounds) {
            this.#isRunning = false;
            this.#scoreboard.postAverageScore();
        }
        setTimeout(() => this.serve(), this.getFrequency());
        return ms;
    }

    setFrequency(frequency: number) {
        this.#frequency = frequency;
    }

    setSpeed(speed: number) {
        this.#speed = speed;
    }

    setRounds(rounds: number) {
        this.#rounds = rounds;
    }

    getCourtHeight() {
        const elem = document.getElementById(this.#courtId) as HTMLElement;
        return elem.clientHeight;
    }

    serve() {
        const frame = () => {
            if (this.#end) {
                clearInterval(String(id));
                if (elem) {
                    elem.style.marginTop = initTop;
                    elem.style.marginLeft = initLeft;
                }
            } else if (pos >= ((this.getCourtHeight() / 4) - 5)) {
                clearInterval(String(id));
                if (elem) {
                    elem.style.marginTop = initTop;
                    elem.style.marginLeft = initLeft;
                }
                this.return(null);
            } else {
                pos += this.#speed;
                top += 4 * this.#speed;
                direction === "deuce" ? (left += this.#speed) : (left -= this.#speed);
                if (elem) {
                    elem.style.marginTop = top + "px";
                    elem.style.marginLeft = left + "px";
                }
            }
        };
        if (!this.#isRunning || this.#round > this.#rounds) {
            return;
        }
        const randomZeroOrOne = Math.round(Math.random());
        const direction = randomZeroOrOne === 0 ? "deuce" : "ad";
        this.#serveDirection = direction;
        let id: NodeJS.Timeout | null = null;
        const elem = document.getElementById(this.#ballId);
        if (!elem) return;
        const initTop = elem.style.marginTop;
        const initLeft = elem.style.marginLeft;
        let pos = 0;
        let top = 0;
        let left = 0;
        if (id) clearInterval(id);
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
