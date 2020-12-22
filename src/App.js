import React, { useState } from "react";
import Opener from "./components/Opener";
import TournamentTree from "./components/TournamentTree";
import MatchSiteComponent from "./components/MatchSiteComponent";
import Contender from "./classes/Contender";
import Player from "./classes/Player";
import Tree from "./classes/Tree";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SummaryWinnerComponent from "./components/SummaryWinnerComponent";
import GeneralSummaryComponent from "./components/GeneralSummaryComponent";

export const App = () => {
    const [listOfContenders, setListOfContenders] = useState([]);
    const [tt, setTournamentTree] = useState(new Tree(listOfContenders));
    const [players, setPlayers] = useState([]);
    const [file1Name, setFile1Name] = useState("");
    const [file2Name, setFile2Name] = useState("");

    const getCSV = (data, fileInfo) => {
        let fetchedData = [];
        for (var i = 0; i < data.length - 1; i++) {
            fetchedData.push(
                new Contender(data[i][0], data[i][1], data[i][2], data[i][3])
            );
        }
        fetchedData = fetchedData.sort(() => Math.random() - 0.5);

        setListOfContenders(fetchedData);
        setTournamentTree(new Tree(fetchedData));
        setFile1Name(fileInfo.name);
    };

    const getPlayersCSV = (data, fileInfo) => {
        let fetchedData = [];
        for (var i = 0; i < data.length - 1; i++) {
            fetchedData.push(new Player(data[i][1], data[i][2]));
        }
        setPlayers(fetchedData);
        setFile2Name(fileInfo.name);
    };

    const numberOfColumns = Math.log2(listOfContenders.length);
    let columnTemplate = "";
    for (let i = 0; i < numberOfColumns; i++) {
        columnTemplate += Math.floor(100 / numberOfColumns).toString() + "% ";
    }
    let wrap = {
        width: "100%",
        minHeight: "-webkit-fill-available",
        display: "grid",
        gridTemplateRows: "auto",
        gridTemplateColumns: columnTemplate,
        rowGap: "5px",
        backgroundColor: "#343434",
        color: "#fcfaf1",
    };

    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/"
                    exact
                    render={() => (
                        <Opener
                            getCSV={getCSV}
                            getPlayersCSV={getPlayersCSV}
                            n1={file1Name}
                            n2={file2Name}
                        />
                    )}
                />
                <Route
                    path="/tournament"
                    exact
                    render={() => (
                        <TournamentTree
                            listOfContenders={listOfContenders}
                            tournamentTree={tt}
                            players={players}
                            styleee={wrap}
                        />
                    )}
                />
                <Route
                    path="/match/:id"
                    exact
                    render={() => (
                        <MatchSiteComponent
                            tournamentTree={tt}
                            players={players}
                        />
                    )}
                />
                <Route
                    path="/winner-summary"
                    exact
                    render={() => (
                        <SummaryWinnerComponent tournamentTree={tt} />
                    )}
                />
                <Route
                    path="/general-summary"
                    exact
                    render={() => (
                        <GeneralSummaryComponent tournamentTree={tt} />
                    )}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
