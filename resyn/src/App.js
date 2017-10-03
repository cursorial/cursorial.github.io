import React, { Component } from 'react';
import BuildContext from './Build';
import StepContext from './Step';
import RollContext from './Roll';
import MasterContext from './Master';
import './App.css';

class HomeOption extends Component {
  render() {
    return (
      <div className="home-option" onClick={this.props.handler}>
        <h3>{this.props.name}</h3>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

class ActiveContext extends Component {
  render() {
    let context;
    
    if(this.props.activeContext === "None") {
      context = <p>No Context Selected</p>
    } else if(this.props.activeContext === "Build") {
      context = <BuildContext />
    } else if(this.props.activeContext === "Step") {
      context = <StepContext />
    } else if(this.props.activeContext === "Roll") {
      context = <RollContext />
    } else if(this.props.activeContext === "Master") {
      context = <MasterContext />
    } else {
      context = <p>Error! An unknown context has been selected!</p>
    }

    return (
      <div id="active-context">
        {context}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      activeContext: "None",
    };

    this.buildHandler = this.buildHandler.bind(this);
    this.stepHandler = this.stepHandler.bind(this);
    this.rollHandler = this.rollHandler.bind(this);
    this.masterHandler = this.masterHandler.bind(this);
  }

  buildHandler() {
    this.setState({activeContext: "Build"});
  }
  stepHandler() {
    this.setState({activeContext: "Step"});
  }
  rollHandler() {
    this.setState({activeContext: "Roll"});
  }
  masterHandler() {
    this.setState({activeContext: "Master"});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">resyn</h1>
        </header>
        <p className="App-intro">
          To get started, press a button below.
        </p>
        <div className="home-options">
          <HomeOption name="Build" description="Engineer your sound." handler={this.buildHandler} />
          <HomeOption name="Step" description="Lay it out." handler={this.stepHandler} />
          <HomeOption name="Roll" description="Connect your loops, make a track." handler={this.rollHandler} />
          <HomeOption name="Master" description="Polish your track, give it some production value." handler={this.masterHandler} />
        </div>
        <ActiveContext activeContext={this.state.activeContext}/>
      </div>
    );
  }
}

export default App;
