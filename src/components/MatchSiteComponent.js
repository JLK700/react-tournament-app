import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../styles/main.css";
import MatchSiteComponentStyle from "../styles/match-site-component-style.module.css";

export const MatchSiteComponent = (props) => {
    const history = useHistory();
    const [contender1hp, setContender1hp] = useState(100);
    const [contender2hp, setContender2hp] = useState(100);
    const [contender1won, setContender1won] = useState(false);
    const [contender2won, setContender2won] = useState(false);
    let dmgDone1 = 0;
    let dmgDone2 = 0;

    const radioRefs = [];
    for (let i = 0; i < props.players.length * 2; i++) {
        radioRefs.push(React.createRef());
    }

    const resetRadio = () => {
        for (let i = 0; i < radioRefs.length; i++) {
            radioRefs[i].current.checked = false;
        }
    };

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

    const hasTounamentEnded = () => {
        return currentMatch.id === props.tournamentTree.tree.length - 1;
    };

    const endTournament = () => {
        history.push("/winner-summary");
    };

    const goNext = () => {
        setContender1hp(100);
        setContender2hp(100);
        setContender1won(false);
        setContender2won(false);
        resetRadio();
        if (!hasTounamentEnded()) {
            history.push("/match/" + String(parseInt(currentMatch.id) + 1));
        } else {
            endTournament();
        }
    };

    const goPrev = () => {
        setContender1hp(100);
        setContender2hp(100);
        setContender1won(false);
        setContender2won(false);
        history.push("/match/" + String(parseInt(currentMatch.id) - 1));
    };

    const goBack = () => {
        history.push("/tournament");
    };

    const sleep = async (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const draw = async (a, b) => {
        if (a <= 0 && b <= 0) {
            setContender1hp(100);
            setContender2hp(100);
            await sleep(10).then(async () => {});
            return await draw(contender1hp, contender2hp);
        } else if (a <= 0) {
            currentMatch.winner = currentMatch.contender2;
            setContender2won(true);
            dmgDone1 = 100 - b;
            dmgDone2 = 100 - a;
            return;
        } else if (b <= 0) {
            currentMatch.winner = currentMatch.contender1;
            setContender1won(true);
            dmgDone1 = 100 - b;
            dmgDone2 = 100 - a;
            return;
        }

        a -= Math.floor(Math.random() * 10) + 1;
        b -= Math.floor(Math.random() * 10) + 1;

        setContender1hp(a);
        setContender2hp(b);

        await sleep(10).then(async () => {
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

    const updatePlayersStats = (c1s, c2s) => {
        const c1 = props.tournamentTree.returnContender(
            currentMatch.contender1.id
        );
        const c2 = props.tournamentTree.returnContender(
            currentMatch.contender2.id
        );

        c1.numberOfMatches++;
        c2.numberOfMatches++;

        c1.additiveScore += c1s;
        c2.additiveScore += c2s;
    };

    const updatePlayersDrawStats = () => {
        console.log("dmg:");
        console.log(dmgDone1);
        console.log(dmgDone2);
        const c1 = props.tournamentTree.returnContender(
            currentMatch.contender1.id
        );
        const c2 = props.tournamentTree.returnContender(
            currentMatch.contender2.id
        );

        if (dmgDone1 > dmgDone2) {
            c1.rafaelsVariable++;
        } else {
            c2.rafaelsVariable++;
        }

        c1.dmg += dmgDone1;
        c2.dmg += dmgDone2;
    };

    const kill = (a, b) => {
        const c1 = props.tournamentTree.returnContender(
            currentMatch.contender1.id
        );
        const c2 = props.tournamentTree.returnContender(
            currentMatch.contender2.id
        );

        c1.dmg += a;
        c2.dmg += b;
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
            updatePlayersDrawStats();
        }

        if (
            contender1score > contender2score ||
            currentMatch.winner === currentMatch.contender1
        ) {
            currentMatch.winner = currentMatch.contender1;
            setContender1won(true);

            if (currentMatch.contender1score !== currentMatch.contender2score) {
                setContender2hp(0);
                kill(100, 0);
            }

            if (currentMatch.contender1score === currentMatch.contender2score) {
                setContender2hp(100 - dmgDone1);
                setContender2hp(100 - dmgDone1);
                setContender2hp(100 - dmgDone1);
            }

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
            setContender2won(true);

            if (currentMatch.contender1score !== currentMatch.contender2score) {
                setContender1hp(0);
                kill(0, 100);
            }

            if (currentMatch.contender1score === currentMatch.contender2score) {
                setContender1hp(100 - dmgDone2);
                setContender1hp(100 - dmgDone2);
                setContender1hp(100 - dmgDone2);
            }

            for (let i = 0; i < props.players.length; i++) {
                if (playersVotes[i] === 2) {
                    props.players[i].correctAnswers++;
                }
            }
        }

        updatePlayersStats(contender1score, contender2score);

        console.log(props.players);
        if (!hasTounamentEnded()) {
            updateTree();
        }
    };

    return (
        <div className={MatchSiteComponentStyle.container}>
            <div className={MatchSiteComponentStyle.matchTitle}>
                <button
                    className={`rounded-md ${MatchSiteComponentStyle.smallButton}`}
                    onClick={goPrev}
                >
                    Previous
                </button>

                {giveLevel(currentMatch.id) === levels.length - 1 ? (
                    <p>Final</p>
                ) : giveLevel(currentMatch.id) === levels.length - 2 ? (
                    <p>Semifinal</p>
                ) : giveLevel(currentMatch.id) === levels.length - 3 ? (
                    <p>Quaterfinal</p>
                ) : (
                    <p>Match: {currentMatch.id}</p>
                )}

                <button
                    className={`rounded-md ${MatchSiteComponentStyle.smallButton}`}
                    onClick={goBack}
                >
                    Back to Tournament Tree
                </button>
            </div>

            {currentMatch.contender1 !== null ? (
                <div className={MatchSiteComponentStyle.contender1}>
                    <p
                        className={
                            contender1won
                                ? MatchSiteComponentStyle.contenderNameBoosted
                                : MatchSiteComponentStyle.contenderName
                        }
                    >
                        {currentMatch.contender1.name}
                    </p>
                    {currentMatch.contender1.isImg() ? (
                        <p>
                            <img
                                className={MatchSiteComponentStyle.image}
                                src={currentMatch.contender1.url}
                            ></img>
                        </p>
                    ) : (
                        <p>
                            <iframe
                                className={MatchSiteComponentStyle.frame}
                                src={currentMatch.contender1.url}
                                allowFullScreen
                            ></iframe>
                        </p>
                    )}
                    <progress max="100" value={contender1hp}></progress>
                    <p>{contender1hp}</p>
                </div>
            ) : null}

            {currentMatch.isActive() ? (
                <div className={MatchSiteComponentStyle.players}>
                    <div
                        className={
                            MatchSiteComponentStyle.radioButtonsContainer
                        }
                    >
                        {props.players.map((player, index) => (
                            <div
                                className={MatchSiteComponentStyle.singlePlayer}
                            >
                                <input
                                    type="radio"
                                    name={player.name}
                                    value={currentMatch.contender1.name}
                                    ref={radioRefs[2 * index]}
                                    className="form-checkbox h-6 w-6"
                                ></input>
                                <p>{player.name}</p>
                                <input
                                    type="radio"
                                    name={player.name}
                                    value={currentMatch.contender2.name}
                                    ref={radioRefs[2 * index + 1]}
                                    className="form-checkbox h-6 w-6"
                                ></input>
                            </div>
                        ))}
                    </div>

                    <div className={MatchSiteComponentStyle.buttons}>
                        <button
                            className={`rounded-md ${MatchSiteComponentStyle.bigButton}`}
                            onClick={goNext}
                        >
                            Next
                        </button>
                        <button
                            className={`rounded-md ${MatchSiteComponentStyle.bigButton}`}
                            onClick={resolveBattle}
                        >
                            BATTLE
                        </button>
                    </div>
                </div>
            ) : null}

            {currentMatch.contender2 !== null ? (
                <div className={MatchSiteComponentStyle.contender2}>
                    <p
                        className={
                            contender2won
                                ? MatchSiteComponentStyle.contenderNameBoosted
                                : MatchSiteComponentStyle.contenderName
                        }
                    >
                        {currentMatch.contender2.name}
                    </p>
                    {currentMatch.contender2.isImg() ? (
                        <p>
                            <img
                                className={MatchSiteComponentStyle.image}
                                src={currentMatch.contender2.url}
                            ></img>
                        </p>
                    ) : (
                        <p>
                            <iframe
                                className={MatchSiteComponentStyle.frame}
                                src={currentMatch.contender2.url}
                                allowFullScreen
                            ></iframe>
                        </p>
                    )}
                    <progress max="100" value={contender2hp}></progress>
                    <p>{contender2hp}</p>
                </div>
            ) : null}
        </div>
    );
};

export default MatchSiteComponent;
