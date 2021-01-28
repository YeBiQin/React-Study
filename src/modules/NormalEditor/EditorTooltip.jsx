
import React, { Component } from 'react';

export class EditorTooltip extends Component {
  constructor(props) {
    super();
  }
  
  render() {
    return (
      <div id="ly-editor_tooltip">
        <a href="#" onClick={this.changeStyle.bind(this, "italic")}>斜体</a>
        <a href="#" onClick={this.changeStyle.bind(this, "fontSize", 1)}>1号</a>
        <a href="#" onClick={this.changeStyle.bind(this, "strikeThrough")}>删除线</a>
        <a href="#" onClick={this.changeStyle.bind(this, "fontName", "KaiTi")}>楷</a>
        <a href="#" onClick={this.changeStyle.bind(this, "foreColor", "red")}>红色</a>
        <a href="#" onClick={this.changeStyle.bind(this, "foreColor", "black")}>黑</a>
      </div>
    )
  }

  changeStyle(command, value) {
    console.log(command, value);
    value ? document.execCommand(command, false, value) : document.execCommand(command, false, null);
  }
}