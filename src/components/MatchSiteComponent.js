import React from "react";
import { useParams, useHistory } from "react-router-dom";

export const MatchSiteComponent = (props) => {
    const history = useHistory();

    let { id } = useParams();
    let currentMatch = props.tournamentTree.tree[parseInt(id)];

    const onHandle = () => {
        history.push("/match/" + String(parseInt(currentMatch.id) + 1));
    };

    const comeBack = () => {
        history.push("/tournament");
    };

    return (
        <div>
            <p>id: {currentMatch.id}</p>
            <p>contender1 :{currentMatch.conternder1.name}</p>
            <p>contender2 :{currentMatch.conternder2.name}</p>
            <button onClick={onHandle}>Thank you, next</button>
            <button onClick={comeBack}>GO back</button>
        </div>
    );
};

export default MatchSiteComponent;
