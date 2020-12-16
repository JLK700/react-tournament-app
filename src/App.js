import React, { Component } from "react";
import Opener from './components/Opener' 
import TournamentTree from './components/TournamentTree'
import Contender from './classes/Contender'
import { BrowserRouter, Route} from "react-router-dom"

class App extends Component{
	state = {listOfContenders: []}

	logContenders = () => {
		console.log(this.state.listOfContenders)
	}

	getCSV = (data, fileInfo) => {
		let fetchedData = []
		for (var i = 0; i < data.length - 1; i++) {
			fetchedData.push(new Contender(data[i][0], data[i][1], data[i][2], data[i][3]))
		}
		this.setState({listOfContenders: fetchedData})

	}

	render() {
		const numberOfColumns = Math.log2(this.state.listOfContenders.length)
		let columnTemplate = ''
		for (let i = 0; i < numberOfColumns; i++) {
			columnTemplate += Math.floor(100 / numberOfColumns).toString() + '% '
		}
		let wrap = {
			display: 'grid',
			gridTemplateRows: 'auto',
			gridTemplateColumns: columnTemplate,
			rowGap: '5px'
		}
		return (
		
			<div className="App">
				<p>Hi</p>
				<Opener getCSV = {this.getCSV}/>
				<button onClick={this.logContenders}> LOG </button>
				<div style={wrap}>
					<TournamentTree  listOfContenders={this.state.listOfContenders}/>
				</div>
				
			</div>
		);
	}
	
}

export default App;
