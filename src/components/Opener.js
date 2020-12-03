import React, { Component } from "react";

class Opener extends Component{

  state = {size: 1}

  handleSubmit = (e) => {
    console.log(this.state.size)
    e.preventDefault();
  }
  
  handleChange = (e) => {
    this.state.size = e.target.value
  }

  render() {
    return (
        <div>
          <div>
              <p>Let The Tournament Begin!</p>
              <form onSubmit={this.handleSubmit}>
                <label>
                    Enter Tournament size:
                    <input type="number" onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit Tournament size" />
              </form>
          </div>
          <div>
              <input type="file" name="Select Tournament CSV" accept=".csv"></input>
          </div>
        </div>    
      );
  }
}

export default Opener;