import React from "react";
import CSVReader from "react-csv-reader";
import { useHistory } from "react-router-dom";
import "../styles/main.css";
import OpenerStyle from "../styles/opener-style.module.css";

export const Opener = (props) => {
    const history = useHistory();

    const onClickHandle = () => {
        history.push("/tournament");
    };

    console.log(props.n1)
    console.log(props.n2)

    return (
        <div className={` bg-gray-400 ${OpenerStyle.container}`}>
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
                <button onClick={onClickHandle}>Start Tournament</button>
            </div>
        </div>
    );
};

export default Opener;
