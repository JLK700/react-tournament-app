import React from "react";
import { useHistory } from "react-router-dom";

export const SummaryWinnerComponent = (props) => {
    const history = useHistory();
    const winner =
        props.tournamentTree.tree[props.tournamentTree.tree.length - 1].winner;

    const proceed = () => {
        history.push("/general-summary");
    };

    return (
        <div>
            <div className="winner-left">
                <p>WINNER!!!</p>
                <p>{winner.name}</p>

                {winner.isImg() ? (
                    <p>
                        <img src={winner.url}></img>
                    </p>
                ) : (
                    <p>
                        <iframe src={winner.url} allowFullScreen></iframe>
                    </p>
                )}
            </div>
            <div className="winner-right">
                {props.tournamentTree.tree.map((match, index) =>
                    match.contender1 === winner ? (
                        <div>
                            <p>
                                {" "}
                                {match.contender1score} :{" "}
                                {match.contender2score}{" "}
                            </p>
                            <p> Against </p>
                            <p> {match.contender2.name} </p>
                        </div>
                    ) : match.contender2 === winner ? (
                        <div>
                            <p>
                                {" "}
                                {match.contender1score} :{" "}
                                {match.contender2score}{" "}
                            </p>
                            <p> Against </p>
                            <p> {match.contender1.name} </p>
                        </div>
                    ) : null
                )}
            </div>
            <button onClick={proceed}>Next</button>
        </div>
    );
};

export default SummaryWinnerComponent;
