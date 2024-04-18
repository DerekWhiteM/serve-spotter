export class Game {
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

    constructor() {
        this.#scoreboard = new Scoreboard();
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
            ms = 10000;
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
            } else if (pos >= this.getCourtHeight() / 4 - 5) {
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

    async start() {
        this.reset();
        this.#isRunning = true;
    }
}

class Scoreboard {
    #scores: number[] = [];
    #tableId = "scoreboard";
    #avgId = "avg";
    #bestScoreId = "bestScore";
    #bestScore: number | null = null;

    postAverageScore() {
        if (this.#scores.length === 0) return 0;
        const sum = this.#scores.reduce((total, num) => total + num, 0);
        const avg = sum / this.#scores.length;
        const elem = document.getElementById(this.#avgId);
        if (!elem) return;
        const score = Math.round(avg);
        elem.innerHTML = "Score: " + score;
        this.postNewBestScore(score);
    }

    private postNewBestScore(score: number) {
        if (this.#bestScore !== null && this.#bestScore < score) return;
        this.#bestScore = score;
        const elem = document.getElementById(this.#bestScoreId);
        if (!elem) return;
        elem.innerHTML = "Best: " + score;
    }

    addScore(score: number) {
        this.#scores.push(score);
        const table = document.getElementById(this.#tableId);
        if (!table) return;
        const tbody = table.getElementsByTagName("tbody")[0];
        const row = tbody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = String(this.#scores.length);
        cell2.innerHTML = String(score);
    }

    reset() {
        this.#scores = [];
        const table = document.getElementById(this.#tableId);
        const avg = document.getElementById(this.#avgId);
        if (!table || !avg) return;
        const tbody = table.getElementsByTagName("tbody")[0];
        avg.innerHTML = "";
        tbody.innerHTML = "";
    }
}
