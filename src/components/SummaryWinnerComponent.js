import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/main.css";
import SummaryWinnerComponentStyle from "../styles/summary-winner-component-style.module.css";

export const SummaryWinnerComponent = (props) => {
    const history = useHistory();
    const winner =
        props.tournamentTree.tree[props.tournamentTree.tree.length - 1].winner;

    const proceed = () => {
        history.push("/general-summary");
    };

    const endTournament = () => {
        history.push("/");
    };

    const goBack = () => {
        history.push("/tournament");
    };

    let size = Math.log2(props.tournamentTree.tree.length + 1);
    const start = Math.log2(props.tournamentTree.tree.length + 1);

    return (
        <div className={SummaryWinnerComponentStyle.container}>
            <div className={SummaryWinnerComponentStyle.title}>
                <p>WINNER!!!</p>
            </div>

            <div className={SummaryWinnerComponentStyle.winnerLeft}>
                <p>{winner.name}</p>

                {winner.isImg() ? (
                    <p>
                        <img
                            className={SummaryWinnerComponentStyle.image}
                            src={winner.url}
                        ></img>
                    </p>
                ) : (
                    <p>
                        <iframe
                            className={SummaryWinnerComponentStyle.frame}
                            src={winner.url}
                            allowFullScreen
                        ></iframe>
                    </p>
                )}
            </div>
            <div className={SummaryWinnerComponentStyle.winnerRight}>
                {props.tournamentTree.tree.map((match, index) =>
                    match.contender1 === winner ? (
                        <div
                            className={
                                SummaryWinnerComponentStyle.singleMatchContainer
                            }
                        >
                            <div
                                className={
                                    SummaryWinnerComponentStyle.singleMatchTitle
                                }
                            >
                                {size === 1 ? (
                                    <p>Final</p>
                                ) : size === 2 ? (
                                    <p>Semifinal</p>
                                ) : size === 3 ? (
                                    <p>Quaterfinal</p>
                                ) : (
                                    <p>Round {start - size + 1}</p>
                                )}

                                {console.log(size--)}
                            </div>
                            <div
                                className={
                                    SummaryWinnerComponentStyle.singleMatch
                                }
                            >
                                <div
                                    className={
                                        SummaryWinnerComponentStyle.bigger
                                    }
                                >
                                    <a
                                        style={{
                                            color: " #e6b31e",
                                            fontWeight: "bold",
                                            fontSize: "2.7vh",
                                        }}
                                    >
                                        {match.contender1score}
                                    </a>
                                    <a> : </a>
                                    <a> {match.contender2score} </a>
                                </div>
                                <a> vs </a>
                                <a
                                    className={
                                        SummaryWinnerComponentStyle.bigger
                                    }
                                >
                                    {match.contender2.name}
                                </a>
                            </div>
                        </div>
                    ) : match.contender2 === winner ? (
                        <div
                            className={
                                SummaryWinnerComponentStyle.singleMatchContainer
                            }
                        >
                            <div
                                className={
                                    SummaryWinnerComponentStyle.singleMatchTitle
                                }
                            >
                                {size === 1 ? (
                                    <p>Final</p>
                                ) : size === 2 ? (
                                    <p>Semifinal</p>
                                ) : size === 3 ? (
                                    <p>Quaterfinal</p>
                                ) : (
                                    <p>Round {start - size + 1}</p>
                                )}
                                {console.log(size--)}
                            </div>
                            <div
                                className={
                                    SummaryWinnerComponentStyle.singleMatch
                                }
                            >
                                <div
                                    className={
                                        SummaryWinnerComponentStyle.bigger
                                    }
                                >
                                    <a
                                        style={{
                                            color: " #e6b31e",
                                            fontWeight: "bold",
                                            fontSize: "2.7vh",
                                        }}
                                    >
                                        {match.contender2score}
                                    </a>
                                    <a> : </a>
                                    <a> {match.contender1score} </a>
                                </div>
                                <a> vs </a>
                                <a
                                    className={
                                        SummaryWinnerComponentStyle.bigger
                                    }
                                >
                                    {match.contender1.name}
                                </a>
                            </div>
                        </div>
                    ) : null
                )}
            </div>

            <div className={SummaryWinnerComponentStyle.buttons}>
                <button
                    className={`rounded-md ${SummaryWinnerComponentStyle.button}`}
                    onClick={proceed}
                >
                    General Summary
                </button>

                <button
                    className={`rounded-md ${SummaryWinnerComponentStyle.button}`}
                    onClick={goBack}
                >
                    Tournament Tree
                </button>

                <button
                    className={`rounded-md ${SummaryWinnerComponentStyle.button}`}
                    onClick={endTournament}
                >
                    End Tournament
                </button>
            </div>
        </div>
    );
};

export default SummaryWinnerComponent;
