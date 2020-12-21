import React from "react";
import MatchComponent from "./MatchComponent";
import "../styles/main.css";
import TournamentTreeStyle from "../styles/tournament-tree-style.module.css";

export const TournamentTree = (props) => {
    if (props.listOfContenders.length) {
        console.log(props.players);

        const tournamentTree = props.tournamentTree;
        let threshold = props.listOfContenders.length / 2;
        let current_match = -1;
        let columnNumber = 1;
        return (
            tournamentTree.tree.map((match, index) => {
            current_match++;

            let stylingItem = {
                gridColumnStart: columnNumber.toString(),
                gridColumnEnd: (columnNumber + 1).toString(),
                gridRowStart: (
                    current_match * Math.pow(2, columnNumber - 1) +
                    1
                ).toString(),
                gridRowEnd: (
                    current_match * Math.pow(2, columnNumber - 1) +
                    1 +
                    Math.pow(2, columnNumber - 1)
                ).toString(),
                justifySelf: "center",
                alignSelf: "center",
                border: "3px solid #e6b31e",
                width: "10rem",
                height: "4rem",
                paddingLeft: "5px",
                margin: "5px",
            };

            if (current_match === threshold - 1) {
                threshold /= 2;
                current_match = -1;
                columnNumber++;
            }

            return (
                <MatchComponent
                    key={match.id}
                    stylingItem={stylingItem}
                    match={match}
                />
            );
        }));
    } else {
        return (
            <div>
                <p>empty</p>
            </div>
        );
    }
};

export default TournamentTree;
