import React, { Component } from "react";
import CSVReader from 'react-csv-reader';


class Opener extends Component{

 render() {
    return (
        <div>
            <p>Let The Tournament Begin!</p>
            <p>Select Tournament CSV:</p>
            <CSVReader onFileLoaded={this.props.getCSV}/>
        </div>      
      );
  }
}

export default Opener;