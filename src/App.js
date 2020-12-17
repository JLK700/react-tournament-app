import React, { useState } from "react";
import Opener from "./components/Opener";
import TournamentTree from "./components/TournamentTree";
import MatchSiteComponent from "./components/MatchSiteComponent";
import Contender from "./classes/Contender";
import Player from "./classes/Player";
import Tree from "./classes/Tree";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export const App = () => {
    const [listOfContenders, setListOfContenders] = useState([]);
    const [tt, setTournamentTree] = useState(new Tree(listOfContenders));
    const [players, setPlayers] = useState([]);

    const getCSV = (data, fileInfo) => {
        let fetchedData = [];
        for (var i = 0; i < data.length - 1; i++) {
            fetchedData.push(
                new Contender(data[i][0], data[i][1], data[i][2], data[i][3])
            );
        }
        setListOfContenders(fetchedData);
        setTournamentTree(new Tree(fetchedData));
    };

    const getPlayersCSV = (data, fileInfo) => {
        let fetchedData = [];
        for (var i = 0; i < data.length - 1; i++) {
            fetchedData.push(new Player(data[i][1], data[i][2]));
        }
        setPlayers(fetchedData);
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
        <BrowserRouter>
            <Switch>
                <Route
                    path="/"
                    exact
                    render={() => (
                        <Opener getCSV={getCSV} getPlayersCSV={getPlayersCSV} />
                    )}
                />
                <Route
                    path="/tournament"
                    exact
                    render={() => (
                        <div style={wrap}>
                            <TournamentTree
                                listOfContenders={listOfContenders}
                                tournamentTree={tt}
                                players={players}
                            />
                        </div>
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
            </Switch>
        </BrowserRouter>
    );
};

export default App;
