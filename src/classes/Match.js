class Match {
    constructor(id, contender1, contender2) {
        this.id = id;
        this.contender1 = contender1;
        this.contender2 = contender2;
        this.contender1score = 0;
        this.contender2score = 0;
        this.winner = null;
    }

    isEmpty = () => this.contender1 !== null && this.contender2 !== null;

    isFinished = () => this.contender1score !== 0 || this.contender2score !== 0;

    wasDrawn = () => this.contender1score === this.contender2score;
}

export default Match;
