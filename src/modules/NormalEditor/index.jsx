
import React, { Component } from 'react';
import {EditorTooltip} from "./EditorTooltip";
export class NormalEditor extends Component {
  constructor(props) {
    super();
    this.editView = null;
  }

  render() {
    return (
      <div className="ly-editor_container">
        <EditorTooltip/>
        <div className="ly-editor_content" contentEditable="true" />
      </div>
    )
  }
}