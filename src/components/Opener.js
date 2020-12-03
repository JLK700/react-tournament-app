import React, { Component } from "react";
import CSVReader from 'react-csv-reader';
import Contender from '../classes/Contender'

class Opener extends Component{

  state = {listOfContenders: []}

  getCSV = (data, fileInfo) => {
    for (var i = 0; i < data.length - 1; i++) {
      this.state.listOfContenders.push(new Contender(data[i][0], data[i][1], data[i][2], data[i][3]))
    }

    console.log(this.state.listOfContenders[0])
  }

  render() {
    return (
        <div>
            <p>Let The Tournament Begin!</p>
            <p>Select Tournament CSV:</p>
            <CSVReader onFileLoaded={this.getCSV}/>
        </div>      
      );
  }
}

export default Opener;