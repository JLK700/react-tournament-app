import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export const MatchSiteComponent = (props) => {
    const history = useHistory();

    const radioRefs = [];
    for (let i = 0; i < props.players.length * 2; i++) {
        radioRefs.push(React.createRef());
    }

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

    const draw = () => {
        // TODO
        console.log("dupa");
    };

    const updateTree = () => {
        // TODO
        console.log(currentMatch.winner.name);
    };

    const resolveBattle = () => {
        const playersVotes = [];
        for (let i = 0; i < props.players.length; i++) {
            playersVotes.push(2);
        }

        let contender1score = 0;
        let contender2score = 0;
        let currPlayer = -1;

        for (let i = 0; i < radioRefs.length; i++) {
            let curr = radioRefs[i].current.checked;
            if (i % 2 === 0) {
                currPlayer++;
                if (curr) {
                    contender1score++;
                    playersVotes[currPlayer] = 1;
                }
            } else {
                if (curr) {
                    contender2score++;
                }
            }
        }

        currentMatch.contender1score = contender1score;
        currentMatch.contender2score = contender2score;

        if (contender1score === contender2score) {
            draw();
        } else {
            if (contender1score > contender2score) {
                currentMatch.winner = currentMatch.contender1;

                for (let i = 0; i < props.players.length; i++) {
                    if (playersVotes[i] === 1) {
                        props.players[i].correctAnswers++;
                    }
                }
            } else {
                currentMatch.winner = currentMatch.contender2;

                for (let i = 0; i < props.players.length; i++) {
                    if (playersVotes[i] === 2) {
                        props.players[i].correctAnswers++;
                    }
                }
            }
            updateTree();
        }

        console.log(props.players);
    };

    return (
        <div>
            <p>id: {currentMatch.id}</p>
            {currentMatch.isEmpty() ? (
                <div>
                    <div>
                        <p>contender1 :{currentMatch.contender1.name}</p>
                        {currentMatch.contender1.isImg() ? (
                            <p>
                                <img src={currentMatch.contender1.url}></img>
                            </p>
                        ) : (
                            <p>
                                <iframe
                                    src={currentMatch.contender1.url}
                                    allowFullScreen
                                ></iframe>
                            </p>
                        )}
                    </div>
                    <div>
                        <p>contender2 :{currentMatch.contender2.name}</p>
                        {currentMatch.contender2.isImg() ? (
                            <p>
                                <img src={currentMatch.contender2.url}></img>
                            </p>
                        ) : (
                            <p>
                                <iframe
                                    src={currentMatch.contender2.url}
                                    allowFullScreen
                                ></iframe>
                            </p>
                        )}
                    </div>

                    {props.players.map((player, index) => (
                        <div>
                            <p>{player.name}</p>
                            <div>
                                <input
                                    type="radio"
                                    name={player.name}
                                    value={currentMatch.contender1.name}
                                    ref={radioRefs[2 * index]}
                                    defaultChecked="false"
                                ></input>
                                <input
                                    type="radio"
                                    name={player.name}
                                    value={currentMatch.contender2.name}
                                    ref={radioRefs[2 * index + 1]}
                                    defaultChecked="false"
                                ></input>
                            </div>
                        </div>
                    ))}

                    <button onClick={goNext}>Thank you, next</button>
                    <button onClick={goPrev}>Thank you, prev</button>
                    <button onClick={comeBack}>GO back</button>
                    <button onClick={resolveBattle}> BATTLE </button>
                </div>
            ) : null}
        </div>
    );
};

export default MatchSiteComponent;
