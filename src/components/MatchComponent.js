import React, { Component } from 'react'
import Match from '../classes/Match'
import { Link, useHistory } from 'react-router-dom'

export default class MatchComponent extends Component {

    handleClick = () => {
        //useHistory().push('/' + this.props.match.id)
    }

    render() {
        const match = this.props.match
        return (
            
             <div style={this.props.stylingItem} onClick= {this.handleClick}>
                <p> match id:  {match.id} </p>
                {match.isEmpty() ? <p> {match.conternder1.name} vs {match.conternder2.name}</p> : null}
            </div>
           
        )
    }
}
