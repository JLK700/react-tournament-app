class Contender {
    constructor(id, name, isVideo, url) {
        this.id = id;
        this.name = name;
        this.isVideo = isVideo;
        this.url = url;
        this.numberOfMatches = 0;
        this.additiveScore = 0;
        this.rafaelsVariable = 0;
        this.dmg = 0;
    }

    isImg = () => {
        return this.isVideo === "false";
    };

    avgScore = () => {
        if (this.numberOfMatches !== 0) {
            return this.additiveScore / this.numberOfMatches;
        }
        return 0;
    };
}

export default Contender;
