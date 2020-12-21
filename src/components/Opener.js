import React from "react";
import CSVReader from "react-csv-reader";
import { useHistory } from "react-router-dom";
import "../styles/main.css";
import OpenerStyle from "../styles/opener-style.module.css";

export const Opener = (props) => {
    const history = useHistory();

    const startTournament = () => {
        history.push("/tournament");
    };

    const alertMissingFiles = () => {
        if (props.n1 === "") {
            alert('Please enter tournament CSV')
        } else if (props.n2 === "") {
            alert('Please enter players CSV')
        }
    }

    return (
        <div className={OpenerStyle.container}>
            <div className={OpenerStyle.openingTitle}>
                <p>Let The Tournament Begin!</p>
            </div>

            <div className={OpenerStyle.leftCSV}>
                <div className={`rounded-md ${OpenerStyle.x}`}>
                    <CSVReader inputStyle={{height: '100%', width: '100%', opacity: '0'}} onFileLoaded={props.getCSV} />
                    <div className={OpenerStyle.y}>
                        <a>Select Tournament CSV </a>
                    </div>
                </div>
                {props.n1 !== "" ? (<div>
                    <p>{props.n1}</p>
                    </div>) : null}
            </div>
            <div className={OpenerStyle.rightCSV}>
                <div className={`rounded-md ${OpenerStyle.x}`}>
                    <CSVReader inputStyle={{height: '100%', width: '100%', opacity: '0'}} onFileLoaded={props.getPlayersCSV} />
                    <div className={OpenerStyle.y}>
                        <a>Select Players CSV</a>
                    </div>
                </div>
                {props.n2 !== "" ? (<div>
                    <p>{props.n2}</p>
                    </div>) : null}
            </div>
            <div className={OpenerStyle.openingButton}>
                {props.n1 !== "" && props.n2 !== "" ? (<div>
                    <p><button className={`rounded-md animate-bounce ${OpenerStyle.startTournamentButton}`} onClick={startTournament}>Start Tournament</button></p>
                    </div>) : <button className={`rounded-md ${OpenerStyle.startTournamentButton}`} onClick={alertMissingFiles}>Start Tournament</button>}
            </div>
        </div>
    );
};

export default Opener;
