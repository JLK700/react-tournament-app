import Match from './Match'

class Tree {
    constructor(listOfContenders) {
        this.tree = []
        for (let i = 0; i < listOfContenders.length - 1; i ++) {
            if (i < listOfContenders.length / 2) {
                this.tree.push(new Match(i, listOfContenders[2 * i],  listOfContenders[2 * i + 1]))
            } else {
                this.tree.push(new Match(i, null,  null))
            }
        }
    }
}

export default Tree;
