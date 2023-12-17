class Scoreboard {

    #scores = [];
    #tableId;

    constructor(tableId) {
        this.#tableId = tableId;
    }

    getScores() {
        return this.#scores;
    }

    addScore(score) {
        this.#scores.push(score);
        const table = document.getElementById(this.#tableId);
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = this.#scores.length;
        cell2.innerHTML = score;
    }

    reset() {
        this.#scores = [];
        const table = document.getElementById(this.#tableId);
        while (table.ariaRowSpan.length > 0) {
            table.deleteRow(0);
        }
    }

}