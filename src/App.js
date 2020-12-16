import React, { useState } from "react";
import Opener from "./components/Opener";
import TournamentTree from "./components/TournamentTree";
import Contender from "./classes/Contender";
import { BrowserRouter, Route } from "react-router-dom";

export const App = () => {
    const [listOfContenders, setListOfContenders] = useState([]);

    const getCSV = (data, fileInfo) => {
        let fetchedData = [];
        for (var i = 0; i < data.length - 1; i++) {
            fetchedData.push(
                new Contender(data[i][0], data[i][1], data[i][2], data[i][3])
            );
        }
        setListOfContenders(fetchedData);
    };

    const numberOfColumns = Math.log2(listOfContenders.length);
    let columnTemplate = "";
    for (let i = 0; i < numberOfColumns; i++) {
        columnTemplate += Math.floor(100 / numberOfColumns).toString() + "% ";
    }
    let wrap = {
        display: "grid",
        gridTemplateRows: "auto",
        gridTemplateColumns: columnTemplate,
        rowGap: "5px",
    };

    return (
        <div className="App">
            <Opener getCSV={getCSV} />
            <div style={wrap}>
                <TournamentTree listOfContenders={listOfContenders} />
            </div>
        </div>
    );
};

export default App;
