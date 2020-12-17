import React from "react";
import { useParams, useHistory } from "react-router-dom";

export const MatchSiteComponent = (props) => {
    const history = useHistory();

    let { id } = useParams();
    let currentMatch = props.tournamentTree.tree[parseInt(id)];

    const goNext = () => {
        history.push("/match/" + String(parseInt(currentMatch.id) + 1));
    };

    const goPrev = () => {
        history.push("/match/" + String(parseInt(currentMatch.id) - 1));
    };

    const comeBack = () => {
        history.push("/tournament");
    };

    const resolveBattle = () => {};

    return (
        <div>
            <p>id: {currentMatch.id}</p>
            <div>
                <p>contender1 :{currentMatch.conternder1.name}</p>
                {currentMatch.conternder1.isImg() ? (
                    <p>
                        <img src={currentMatch.conternder1.url}></img>
                    </p>
                ) : (
                    <p>
                        <iframe
                            src={currentMatch.conternder1.url}
                            allowFullScreen
                        ></iframe>
                    </p>
                )}
            </div>
            <div>
                <p>contender2 :{currentMatch.conternder2.name}</p>
                {currentMatch.conternder2.isImg() ? (
                    <p>
                        <img src={currentMatch.conternder2.url}></img>
                    </p>
                ) : (
                    <p>
                        <iframe
                            src={currentMatch.conternder2.url}
                            allowFullScreen
                        ></iframe>
                    </p>
                )}
            </div>

            {props.players.map((player) => (
                <div>
                    <p>{player.name}</p>
                    <form>
                        <input
                            type="radio"
                            name={player.name}
                            value={currentMatch.conternder1.name}
                        ></input>
                        <input
                            type="radio"
                            name={player.name}
                            value={currentMatch.conternder2.name}
                        ></input>
                    </form>
                </div>
            ))}

            <button onClick={goNext}>Thank you, next</button>
            <button onClick={goPrev}>Thank you, prev</button>
            <button onClick={comeBack}>GO back</button>
            <button onClick={resolveBattle}> BATTLE </button>
        </div>
    );
};

export default MatchSiteComponent;
