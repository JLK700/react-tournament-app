import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export const MatchSiteComponent = (props) => {
    const history = useHistory();
    const [contender1hp, setContender1hp] = useState(100);
    const [contender2hp, setContender2hp] = useState(100);

    const radioRefs = [];
    for (let i = 0; i < props.players.length * 2; i++) {
        radioRefs.push(React.createRef());
    }

    const levels = [];
    let level = (props.tournamentTree.tree.length + 1) / 2;
    let j = 0;
    levels.push(level - 1);
    while (level > 1) {
        level /= 2;
        levels.push(levels[j] + level);
        j++;
    }

    let { id } = useParams();
    let currentMatch = props.tournamentTree.tree[parseInt(id)];

    const goNext = () => {
        setContender1hp(100);
        setContender2hp(100);
        history.push("/match/" + String(parseInt(currentMatch.id) + 1));
    };

    const goPrev = () => {
        setContender1hp(100);
        setContender2hp(100);
        history.push("/match/" + String(parseInt(currentMatch.id) - 1));
    };

    const comeBack = () => {
        history.push("/tournament");
    };

    const sleep = async (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const draw = async (a, b) => {
        if (a <= 0 && b <= 0) {
            setContender1hp(100);
            setContender2hp(100);
            await sleep(1000).then(async () => {});
            return await draw(contender1hp, contender2hp);
        } else if (a <= 0) {
            currentMatch.winner = currentMatch.contender1;
            return;
        } else if (b <= 0) {
            currentMatch.winner = currentMatch.contender2;
            return;
        }

        a -= Math.floor(Math.random() * 10) + 1;
        b -= Math.floor(Math.random() * 10) + 1;

        setContender1hp(a);
        setContender2hp(b);

        await sleep(1000).then(async () => {
            await draw(a, b);
        });
    };

    const giveLevel = (id) => {
        for (let i = 0; i < levels.length; i++) {
            if (id <= levels[i]) {
                return i;
            }
        }
        return -1;
    };

    const countNextMatchIndes = () => {
        const treshold = levels[giveLevel(currentMatch.id)];
        const prev_treshold = levels[giveLevel(currentMatch.id) - 1];

        if (giveLevel(currentMatch.id) === 0) {
            return treshold + Math.floor(currentMatch.id / 2) + 1;
        } else {
            return (
                treshold +
                Math.floor((currentMatch.id - prev_treshold - 1) / 2) +
                1
            );
        }
    };

    const updateTree = () => {
        const next_match_index = countNextMatchIndes();

        if (currentMatch.id % 2 === 0) {
            props.tournamentTree.tree[next_match_index].contender1 =
                currentMatch.winner;
        } else {
            props.tournamentTree.tree[next_match_index].contender2 =
                currentMatch.winner;
        }
    };

    const resolveBattle = async () => {
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
            await draw(contender1hp, contender2hp);
        }

        if (
            contender1score > contender2score ||
            currentMatch.winner === currentMatch.contender1
        ) {
            currentMatch.winner = currentMatch.contender1;

            for (let i = 0; i < props.players.length; i++) {
                if (playersVotes[i] === 1) {
                    props.players[i].correctAnswers++;
                }
            }
        } else if (
            contender1score < contender2score ||
            currentMatch.winner === currentMatch.contender2
        ) {
            currentMatch.winner = currentMatch.contender2;

            for (let i = 0; i < props.players.length; i++) {
                if (playersVotes[i] === 2) {
                    props.players[i].correctAnswers++;
                }
            }
        }

        updateTree();
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
                        <progress max="100" value={contender1hp}></progress>
                        <p>{contender1hp}</p>
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
                        <progress max="100" value={contender2hp}></progress>
                        <p>{contender2hp}</p>
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
