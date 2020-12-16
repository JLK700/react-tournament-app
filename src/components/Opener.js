import React from "react";
import CSVReader from "react-csv-reader";

export const Opener = (props) => {
    return (
        <div>
            <p>Let The Tournament Begin!</p>
            <p>Select Tournament CSV:</p>
            <CSVReader onFileLoaded={props.getCSV} />
        </div>
    );
};

export default Opener;
