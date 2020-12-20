import React from "react";
import { useHistory } from "react-router-dom";

export const GeneralSummaryComponent = (props) => {
    const history = useHistory();

    const clickHandle = () => {
        history.push("/");
    };

    return (
        <div>
            <table>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>numberOfMatches</th>
                    <th>Average Score</th>
                    <th>Rafaels Variable</th>
                    <th>Damage</th>
                </tr>
            </table>

            {props.tournamentTree.contenders.map((contender) => (
                <tr>
                    <td width="10" height="25">
                        {contender.isImg() ? (
                            <p>
                                <img src={contender.url}></img>
                            </p>
                        ) : (
                            <p>
                                <iframe
                                    src={contender.url}
                                    allowFullScreen
                                ></iframe>
                            </p>
                        )}
                    </td>
                    <td>{contender.name}</td>
                    <td>{contender.numberOfMatches}</td>
                    <td>{contender.avgScore()}</td>
                    <td>{contender.rafaelsVariable}</td>
                    <td>{contender.dmg}</td>
                </tr>
            ))}

            <button onClick={clickHandle}> END TOURNAMENT </button>
        </div>
    );
};

export default GeneralSummaryComponent;
