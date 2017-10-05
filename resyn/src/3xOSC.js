import React, { Component } from "react";

class OscillatorSelectField extends Component {
  render() {
    return (
      <div className="oscillator-setting">
        <label>{this.props.name}:</label>
        <select
          className="oscillator-setting-element"
          onChange={this.props.handle}
        >
          {this.props.options.map(function(option, i) {
            return (
              <option key={i} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

class OscillatorCheckboxField extends Component {
  render() {
    return (
      <div className="oscillator-setting">
        <label>{this.props.name}:</label>
        <input
          className="oscillator-setting-element"
          type="checkbox"
          onChange={this.props.handle}
        />
      </div>
    );
  }
}

class OscillatorRangeField extends Component {
  render() {
    return (
      <div className="oscillator-setting">
        <label>{this.props.name}:</label>
        <input
          className="oscillator-setting-element"
          type="range"
          value={this.props.value}
          max={this.props.maxValue}
          min={this.props.minValue}
          step={this.props.step}
          onChange={this.props.handle}
        />
      </div>
    );
  }
}

class Oscillator extends Component {
  constructor(props) {
    super();

    this.state = {
      waveform: "sine",
      invert: false,
      volume: 50,
      balance: 0,
      coarseShift: 0,
      fineShift: 0
    };

    this.handleWaveformChange = this.handleWaveformChange.bind(this);
    this.handleInvertChange = this.handleInvertChange.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleBalanceChange = this.handleBalanceChange.bind(this);
    this.handleCoarseShiftChange = this.handleCoarseShiftChange.bind(this);
    this.handleFineShiftChange = this.handleFineShiftChange.bind(this);

    this.waveformOptions = ["sine", "square", "triangle"];
  }

  handleWaveformChange(event) {
    this.setState({
      waveform: event.target.value
    });
    this.props.handle(this.state);
  }
  handleInvertChange(event) {
    this.setState({
      invert: event.target.value
    });
    this.props.handle(this.state);
  }
  handleVolumeChange(event) {
    this.setState({
      volume: event.target.value
    });
    this.props.handle(this.state);
  }
  handleBalanceChange(event) {
    this.setState({
      balance: event.target.value
    });
    this.props.handle(this.state);
  }
  handleCoarseShiftChange(event) {
    this.setState({
      coarseShift: event.target.value
    });
    this.props.handle(this.state);
  }
  handleFineShiftChange(event) {
    this.setState({
      fineShift: event.target.value
    });
    this.props.handle(this.state);
  }

  render() {
    return (
      <div className="oscillator">
        <OscillatorSelectField
          name="Waveform"
          options={this.waveformOptions}
          handle={this.handleWaveformChange}
        />
        <OscillatorCheckboxField
          name="Invert"
          handle={this.handleInvertChange}
        />
        <OscillatorRangeField
          value={this.state.volume}
          minValue="0"
          maxValue="100"
          step="1"
          name="Volume"
          handle={this.handleVolumeChange}
        />
        <OscillatorRangeField
          value={this.state.balance}
          minValue="-50"
          maxValue="50"
          step="1"
          name="Balance"
          handle={this.handleBalanceChange}
        />
        <OscillatorRangeField
          value={this.state.coarseShift}
          minValue="-24"
          maxValue="24"
          step="1"
          name="Coarse Shift"
          handle={this.handleCoarseShiftChange}
        />
        <OscillatorRangeField
          value={this.state.fineShift}
          minValue="-1"
          maxValue="1"
          step="0.01"
          name="Fine Shift"
          handle={this.handleFineShiftChange}
        />
      </div>
    );
  }
}

class OSCx3 extends Component {
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
      },
      frequency: 0,
      oscillators: [
        {
          waveform: "sine",
          invert: false,
          volume: 50,
          balance: 0,
          coarseShift: 0,
          fineShift: 0
        },
        {
          waveform: "sine",
          invert: false,
          volume: 50,
          balance: 0,
          coarseShift: 0,
          fineShift: 0
        },
        {
          waveform: "sine",
          invert: false,
          volume: 50,
          balance: 0,
          coarseShift: 0,
          fineShift: 0
        }
      ],
      oscillatorNodes: [],
      gainNodes: [],
      audioCtx: new (window.AudioContext || window.webkitAudioContext)()
    };

    this.handleOscillator0Change = this.handleOscillator0Change.bind(this);
    this.handleOscillator1Change = this.handleOscillator1Change.bind(this);
    this.handleOscillator2Change = this.handleOscillator2Change.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyDown(event) {
    if (event.key === "z") {
      if(this.state.oscillatorNodes.length < 3) {
        for (var x = 0; x < 3; x++) {
          let gain = this.state.audioCtx.createGain();
          gain.gain.value = this.state.oscillators[x].volume / 100 - 0.2;

          let oscillator = this.state.audioCtx.createOscillator();
          oscillator.type = this.state.oscillators[x].waveform;
          oscillator.frequency.value = 261.6;

          oscillator.connect(gain);
          gain.connect(this.state.audioCtx.destination);

          this.state.oscillatorNodes.push(oscillator);
          this.state.gainNodes.push(gain);
          oscillator.start();
        }
      }
    }
    if (event.key === "s") {
      console.log('s');
      this.setState({
        frequency: 277.2
      });
    }
  }

  handleKeyUp(event) {
    for(var node of this.state.oscillatorNodes) {
      node.stop();
    }
    this.setState({oscillatorNodes: [], gainNodes: []});
  }

  handleOscillator0Change(osc) {
    var oscillators = this.state.oscillators;
    oscillators[0] = osc;
    this.setState({
      oscillators: oscillators 
    });
  }

  handleOscillator1Change(osc) {
    var oscillators = this.state.oscillators;
    oscillators[1] = osc;
    this.setState({
      oscillators: oscillators 
    });
  }

  handleOscillator2Change(osc) {
    var oscillators = this.state.oscillators;
    oscillators[2] = osc;
    this.setState({
      oscillators: oscillators 
    });
  }

  render() {
    return (
      <div className="instrument-panel" onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp} >
        <Oscillator handle={this.handleOscillator0Change} />
        <Oscillator handle={this.handleOscillator1Change} />
        <Oscillator handle={this.handleOscillator2Change} />
      </div>
    );
  }
}

export default OSCx3;
