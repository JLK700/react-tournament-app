import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/main.css";
import MatchComponentStyle from "../styles/match-component-style.module.css";

export const MatchComponent = (props) => {
    const history = useHistory();

    const handleClick = () => {
        history.push("/match/" + props.match.id);
    };

    const match = props.match;

    return (
        <div style={props.stylingItem} onClick={handleClick}>
            <p className={MatchComponentStyle.matchId}> {match.id} </p>
            <div className={MatchComponentStyle.matchContainer}>
            {match.contender1 !== null ? (
                
                    <div className={MatchComponentStyle.matchContender}>
                        <a className={match.contender1 === match.winner ? MatchComponentStyle.b : ""}>{match.contender1.name}</a>
                        <a className={match.contender1 === match.winner ? MatchComponentStyle.b : ""}>{match.contender1score}</a>
                    
                </div>
            ) : null}
            {match.contender2 !== null ? (
                
                    <div className={MatchComponentStyle.matchContender}>
                        <a className={match.contender2 === match.winner ? MatchComponentStyle.b : ""}>{match.contender2.name}</a>
                        <a className={match.contender2 === match.winner ? MatchComponentStyle.b : ""}>{match.contender2score}</a>
                    </div>
                
            ) : null}
            </div>
        </div>
    );
};



export default MatchComponent;
