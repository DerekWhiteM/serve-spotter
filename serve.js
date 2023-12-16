/**
 * Represents a serve.
 * Records the length of time for the player to recognize the direction.
 */
class Serve {
    static MAX_SPEED = 10;
    static MIN_SPEED = 1;

    constructor() {
        this.direction = "deuce";
        this.speed = 1;
        this.start = null;
        this.end = null;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    increaseSpeed() {
        if (this.speed < Serve.MAX_SPEED) {
            this.speed++;
            console.log("New speed: ", this.speed);
        }
    }

    decreaseSpeed() {
        if (this.speed > Serve.MIN_SPEED) {
            this.speed--;
            console.log("New speed: ", this.speed);
        }
    }

    serve() {
        const frame = () => {
            if (pos >= 210) {
                clearInterval(id);
            } else if (!this.end) {
                pos += this.speed;
                top += 4 * this.speed;
                this.direction === "deuce" ? (left += this.speed) : (left -= this.speed);
                elem.style.top = top + "px";
                elem.style.left = left + "px";
            }
        };
        let id = null;
        const elem = document.getElementById("ball");
        let pos = 0;
        let top = 0;
        let left = 202;
        clearInterval(id);
        this.start = Date.now();
        id = setInterval(frame, 10);
    }

    return(direction) {
        if (this.end !== null) {
            console.log("Serve is already returned");
            return null;
        } else if (direction === this.direction) {
            this.end = Date.now();
            const ms = this.end - this.start;
            console.log("Hit: " + ms + " ms");
            return ms;
        } else {
            const ms = 1000;
            console.log("Miss: " + ms + " ms");
            return ms;
        }
    }
}
