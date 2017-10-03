import React, { Component } from 'react';

class Oscillator extends Component {
  constructor(props) {
    super();

    this.state = {
      waveform: "Sine",
      invert: false,
      volume: 50,
      balance: 50,
      coarseShift: 50,
      fineShift: 50
    }

    this.handleWaveformChange = this.handleWaveformChange.bind(this);
    this.handleInvertChange = this.handleInvertChange.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleBalanceChange = this.handleBalanceChange.bind(this);
    this.handleCoarseShiftChange = this.handleCoarseShiftChange.bind(this);
    this.handleFineShiftChange = this.handleFineShiftChange.bind(this);
  }

  handleWaveformChange(event) {
    this.setState({
      waveform: event.target.value
    });
  }
  handleInvertChange(event) {
    this.setState({
      invert: event.target.value
    });
  }
  handleVolumeChange(event) {
    this.setState({
      volume: event.target.value
    });
  }
  handleBalanceChange(event) {
    this.setState({
      balance: event.target.value
    });
  }
  handleCoarseShiftChange(event) {
    this.setState({
      coarseShift: event.target.value
    });
  }
  handleFineShiftChange(event) {
    this.setState({
      fineShift: event.target.value
    });
  }

  render() {
    return (
      <div className="oscillator">
        Waveform: 
        <select onChange={this.handleWaveformChange}>
          <option value="Sine">Sine</option>
          <option value="Triangle">Triangle</option>
          <option value="Square">Square</option>
          <option value="Saw">Saw</option>
        </select>
        Invert: <input type="checkbox" onChange={this.handleInvertChange}></input>
        Volume: <input type="range" max="100" min="0" step="1" onChange={this.handleVolumeChange}></input>{this.state.volume}
        Balance: <input type="range" max="50" min="-50" step="1" onChange={this.handleBalanceChange}></input>{this.state.balance}
        Coarse Shift: <input type="range" max="12" min="-12" step="1" onChange={this.handleCoarseShiftChange}></input>{this.state.coarseShift}
        Fine Shift: <input type="range" max="120" min="-120" step="1" onChange={this.handleFineShiftChange}></input>{this.state.fineShift}
      </div>
    );
  }
}

class InstrumentPanel extends Component {
  constructor(props) {
    super();

    this.state = {
      envelope: {
        delay: 0,
        attack: 20,
        hold: 50,
        decay: 50,
        sustain: 50,
        release: 50
      }
    }
  }

  render() {
    return (
      <div className="instrument-panel">
        <Oscillator />
        <Oscillator />
        <Oscillator />
      </div>
    );
  }
}

class BuildContext extends Component {
  constructor() {
    super();
    
    this.loadPresets = this.loadPresets.bind(this);
    this.savePresets = this.savePresets.bind(this);
  }

  loadPresets() {}
  savePresets() {}

  render() {
    return (
      <div id="build-context">
        <p>Build</p>
        <div id="control-panel">
          <button onClick={this.loadPresets} >Load Presets</button>
          <button onClick={this.savePresets} >Save Presets</button>
        </div>
        <InstrumentPanel />
      </div>
    );
  }
}

export default BuildContext;