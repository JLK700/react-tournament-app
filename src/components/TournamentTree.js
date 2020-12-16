import React, { Component } from 'react'
import Tree from '../classes/Tree'
import MatchComponent from './MatchComponent'

export class TournamentTree extends Component {
    
    render() {
        
        if (this.props.listOfContenders.length) {
            const tournamentTree = new Tree(this.props.listOfContenders)
            let threshold = this.props.listOfContenders.length / 2
            let current_match = -1
            let columnNumber = 1
            return tournamentTree.tree.map( (match, index) => {
                current_match++
                
                let stylingItem = {
                    gridColumnStart: columnNumber.toString(),
                    gridColumnEnd: (columnNumber + 1).toString(),
                    gridRowStart: (current_match * Math.pow(2, columnNumber - 1)  + 1).toString(),
                    gridRowEnd: (current_match * Math.pow(2, columnNumber - 1) + 1 + Math.pow(2, columnNumber - 1)).toString(),
                    justifySelf: 'center',
                    alignSelf: 'center',
                    border: '1px solid black',
                    width: '10rem',
                    paddingLeft: '5px'
                }

                if (current_match === threshold - 1) {
                    threshold /= 2
                    current_match = -1
                    columnNumber++  
                }
                
                return (
                    <MatchComponent key={match.id} stylingItem={stylingItem} match={match}/>
                )
                                                
            })
        } else {
            return (
                <div>
                    <p>empty</p>
                </div>
            )
        }
    }
}

export default TournamentTree
