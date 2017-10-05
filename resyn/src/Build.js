import React, { Component } from "react";
import OSCx3 from "./3xOSC";

class PresetsPanel extends Component {
  render() {
    return <div className="presets-panel" />;
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
        <PresetsPanel />
        <p>Build</p>
        <div id="control-panel">
          <button onClick={this.loadPresets}>Add Presets</button>
          <button onClick={this.savePresets}>Save Presets</button>
        </div>
        <OSCx3 />
      </div>
    );
  }
}

export default BuildContext;
