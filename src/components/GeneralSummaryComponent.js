import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/main.css";
import GeneralSummaryComponentStyle from "../styles/general-summary-component-style.module.css";

export const GeneralSummaryComponent = (props) => {
    const history = useHistory();

    const clickHandle = () => {
        history.push("/");
    };

    const goBack = () => {
        history.push("/tournament");
    };

    const onlyPitcures = () => {
        for (let i = 0; i < props.tournamentTree.contenders.length; i++) {
            if (!props.tournamentTree.contenders[i].isImg()) {
                return false;
            }
        }
        return true;
    };

    return (
        <div className={GeneralSummaryComponentStyle.container}>
            <div className={GeneralSummaryComponentStyle.title}>
                <p>General Summary</p>
            </div>

            <table className={GeneralSummaryComponentStyle.table}>
                <tr>
                    <th
                        className={
                            onlyPitcures()
                                ? GeneralSummaryComponentStyle.thPhotoOnly
                                : GeneralSummaryComponentStyle.thPhotoFrame
                        }
                    >
                        Photo/Video
                    </th>
                    <th className={GeneralSummaryComponentStyle.th}>Name</th>
                    <th className={GeneralSummaryComponentStyle.th}>
                        Number of Matches
                    </th>
                    <th className={GeneralSummaryComponentStyle.th}>
                        Average Score
                    </th>
                    <th className={GeneralSummaryComponentStyle.th}>
                        Rafaels Variable
                    </th>
                    <th className={GeneralSummaryComponentStyle.th}>Damage</th>
                </tr>

                {props.tournamentTree.contenders.map((contender) => (
                    <tr>
                        {contender.isImg() ? (
                            <td className={GeneralSummaryComponentStyle.td}>
                                <div
                                    className={
                                        GeneralSummaryComponentStyle.tdImage
                                    }
                                >
                                    <img
                                        className={
                                            GeneralSummaryComponentStyle.i
                                        }
                                        src={contender.url}
                                    ></img>
                                </div>
                            </td>
                        ) : (
                            <td className={GeneralSummaryComponentStyle.td}>
                                <div
                                    className={
                                        GeneralSummaryComponentStyle.tdFrame
                                    }
                                >
                                    <iframe
                                        src={contender.url}
                                        allowFullScreen
                                        className={
                                            GeneralSummaryComponentStyle.tdFrame
                                        }
                                    ></iframe>
                                </div>
                            </td>
                        )}

                        <td className={GeneralSummaryComponentStyle.td}>
                            <div
                                className={GeneralSummaryComponentStyle.tdName}
                            >
                                {contender.name}
                            </div>
                        </td>
                        <td className={GeneralSummaryComponentStyle.td}>
                            <div
                                className={
                                    GeneralSummaryComponentStyle.tdNumber
                                }
                            >
                                {contender.numberOfMatches}
                            </div>
                        </td>
                        <td className={GeneralSummaryComponentStyle.td}>
                            <div
                                className={
                                    GeneralSummaryComponentStyle.tdNumber
                                }
                            >
                                {contender.avgScore()}
                            </div>
                        </td>
                        <td className={GeneralSummaryComponentStyle.td}>
                            <div
                                className={
                                    GeneralSummaryComponentStyle.tdNumber
                                }
                            >
                                {contender.rafaelsVariable}
                            </div>
                        </td>
                        <td className={GeneralSummaryComponentStyle.td}>
                            <div
                                className={
                                    GeneralSummaryComponentStyle.tdNumber
                                }
                            >
                                {contender.dmg}
                            </div>
                        </td>
                    </tr>
                ))}
            </table>

            <div>
                <button
                    className={`rounded-md ${GeneralSummaryComponentStyle.button}`}
                    onClick={goBack}
                >
                    Tournament Tree
                </button>
                <button
                    className={`rounded-md ${GeneralSummaryComponentStyle.button}`}
                    onClick={clickHandle}
                >
                    End Tournament
                </button>
            </div>
        </div>
    );
};

export default GeneralSummaryComponent;
