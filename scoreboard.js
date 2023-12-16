class Scoreboard {
    #scores = [];

    constructor() {}

    getAverageScore() {
        const total = 0;
        for (const score of this.#scores) {
            total += score;
        }
        return total / this.#scores.length;
    }

    getScores() {
        return this.#scores;
    }

    addScore(score) {
        this.#scores.push(score);
    }
}
