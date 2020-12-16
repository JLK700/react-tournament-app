import React from "react";
import { Link, useHistory } from "react-router-dom";

export const MatchComponent = (props) => {
    const handleClick = () => {
        //useHistory().push("/" + this.props.match.id);
        console.log(props.match.id);
    };

    const match = props.match;
    return (
        <div style={props.stylingItem} onClick={handleClick}>
            <p> match id: {match.id} </p>
            {match.isEmpty() ? (
                <p>
                    {match.conternder1.name} vs {match.conternder2.name}
                </p>
            ) : null}
        </div>
    );
};

export default MatchComponent;
