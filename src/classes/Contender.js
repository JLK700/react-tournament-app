class Contender {
    constructor(id, name, isVideo, url) {
        this.id = id;
        this.name = name;
        this.isVideo = isVideo;
        this.url = url;
    }

    sayMyName() {
        console.log('My name is: ' + this.name)
    }
}

export default Contender;