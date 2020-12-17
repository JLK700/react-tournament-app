import React from "react";
import CSVReader from "react-csv-reader";
import { useHistory } from "react-router-dom";

export const Opener = (props) => {
    const history = useHistory();

    const onClickHandle = () => {
        history.push("/tournament");
    };

    return (
        <div>
            <p>Let The Tournament Begin!</p>
            <p>Select Tournament CSV:</p>
            <CSVReader onFileLoaded={props.getCSV} />
            <p>Select Players CSV:</p>
            <CSVReader onFileLoaded={props.getPlayersCSV} />
            <button onClick={onClickHandle}>Start Tournament</button>
        </div>
    );
};

export default Opener;
