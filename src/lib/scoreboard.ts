export class Scoreboard {
    #scores: number[] = [];
    #tableId;
    #avgId;
    #bestScoreId;
    #bestScore: number | null = null;

    constructor(tableId: string, avgId: string, bestScoreId: string) {
        this.#tableId = tableId;
        this.#avgId = avgId;
        this.#bestScoreId = bestScoreId;
    }

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
        elem.innerHTML = "Best Score: " + score;
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
