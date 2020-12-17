class Contender {
    constructor(id, name, isVideo, url) {
        this.id = id;
        this.name = name;
        this.isVideo = isVideo;
        this.url = url;
    }

    isImg = () => {
        return this.isVideo === "false";
    };
}

export default Contender;
