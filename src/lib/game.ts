import { pb } from "./pocketbase";
import { Scoreboard } from "./scoreboard";

export class Game {
    static MAX_SPEED = 10;
    static MIN_SPEED = 1;

    #ballElement: HTMLElement | null;
    #ballId: string;
    #ballInitialLeft = "0px";
    #ballInitialTop = "0px";
    #end: number | null = null;
    #frequency = 1;
    #intervalId: NodeJS.Timeout | undefined;
    #isRunning = false;
    #round = 1;
    #rounds = 1;
    #scoreboard;
    #serveDirection: string | undefined;
    #speed = 1;
    #start: number | null = null;

    constructor(ballId: string, scoreboard: Scoreboard) {
        this.#ballId = ballId;
        this.#scoreboard = scoreboard;
        this.#ballElement = document.getElementById(this.#ballId);
        if (this.#ballElement) {
            this.#ballInitialTop = this.#ballElement.style.top;
            this.#ballInitialLeft = this.#ballElement.style.left;
        }
        document.addEventListener("keydown", event => {
            if (event.key === "ArrowLeft") {
                this.return("ad");
            } else if (event.key === "ArrowRight") {
                this.return("deuce");
            }
        });
    }

    reset() {
        this.#round = 1;
        this.#start = null;
        this.#end = null;
        this.#isRunning = false;
        this.resetBall();
        this.#scoreboard.reset();
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

    serve() {
        if (!this.#isRunning || this.#round > this.#rounds) {
            // Game is over, don't serve
            return;
        }
        const randomZeroOrOne = Math.round(Math.random());
        const direction = randomZeroOrOne === 0 ? "deuce" : "ad";
        this.#serveDirection = direction;
        let pos = 0;
        let top = 0;
        let left = 202;
        this.#start = Date.now();
        this.#end = null;
        if (this.#intervalId) clearInterval(this.#intervalId);
        this.#intervalId = setInterval(() => {
            if (pos >= 210) {
                // Ball has reached end of path
                this.return(null);
            } else {
                // Continue animation
                pos += this.#speed;
                top += 4 * this.#speed;
                direction === "deuce" ? (left += this.#speed) : (left -= this.#speed);
                if (this.#ballElement) {
                    this.#ballElement.style.top = top + "px";
                    this.#ballElement.style.left = left + "px";
                }
            }
        }, 10);
        this.#round++;
    }

    start() {
        this.reset();
        this.#isRunning = true;
    }

    private resetBall() {
        clearInterval(this.#intervalId);
        if (this.#ballElement) {
            this.#ballElement.style.top = this.#ballInitialTop;
            this.#ballElement.style.left = this.#ballInitialLeft;
        }
    }

    private return(direction: string | null) {
        let ms;
        if (!this.#isRunning || this.#end !== null) {
            // Game has been reset
            return null;
        } else if (direction === this.#serveDirection) {
            // Successful return
            this.#end = Date.now();
            ms = this.#end - (this.#start || 0);
            this.resetBall();
        } else {
            // Missed return
            this.#end = Date.now();
            ms = 5000;
            return this.reset();
        }
        this.#scoreboard.addScore(ms);
        if (this.#round > this.#rounds) {
            // Game completed
            this.#isRunning = false;
            const score = this.#scoreboard.postAverageScore();
            if (pb.authStore.model) {
                pb.collection("played_games").create({ score, user_id: pb.authStore.model.id });
            }
        }
        setTimeout(() => this.serve(), this.#frequency);
        return ms;
    }
}
