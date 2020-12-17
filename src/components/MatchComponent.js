import React from "react";
import { useHistory } from "react-router-dom";

export const MatchComponent = (props) => {
    const history = useHistory();

    const handleClick = () => {
        history.push("/match/" + props.match.id);
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
