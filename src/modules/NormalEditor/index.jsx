
import React, { Component } from 'react';
import {EditorTooltip} from "./EditorTooltip";

export class NormalEditor extends Component {
  constructor(props) {
    super();
    this.editView = null;
  }

  

  render() {
    return (
      <div id="ly-editor_container">
        <EditorTooltip/>
        <div id="ly-editor_content"  contentEditable="true" style={{height: "195px", padding: "15px", borderRadius: "4px", backgroundColor: "white"}} />
      </div>
    )
  }
}