import React, { createRef, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom';

class createNode {
  constructor({ node, editorView, getPosition, decorations, component, onCreatePortal, onRemovePortal }) {
    // 初始化数据
    this.node = node;
    this.editorView = editorView;
    this.getPosition = getPosition;
    this.decorations = decorations;
    this.component = component;
    this.componentRef = createRef();
    this.onCreatePortal = onCreatePortal;
    this.onRemovePortal = onRemovePortal;
    // console.log(this);
    // 开始初始化段落结构
    this.init();
  }

  init() {
    this.dom = document.createElement('div');
    this.dom.classList.add(`richEditor-${this.node.type.name}`);

    // 判断是否是末尾节点，如果不是则证明还有子节点
    if (!this.node.isLeaf) {
      this.contentDOM = document.createElement('div');
      this.contentDOM.classList.add(`richEditor-content`);
      this.dom.appendChild(this.contentDOM);
    }
    // 将组件渲染进容器节点内
    this.renderComponent(this.dom);
  }

  renderComponent(container) {
    const BlockComponent = (props) => {
      const componentRef = useRef(null);

      useEffect(() => {
        const componentDOM = componentRef.current;
        if (componentDOM !== null && this.contentDOM !== null) {
          if (!this.node.isLeaf) {
            componentDOM.appendChild(this.contentDOM);
          }
        }
      }, [componentRef]);

      return (
        <this.component
          ref={componentRef}
          dom={this.dom}
          node={this.node}
          getPos={this.getPos}
          editorView={this.editorView}
          contentDOM={this.contentDOM}
          decorations={this.decorations} />
      );
    }

    ReactDOM.render(<BlockComponent />, container);
  }
}


export function createEditorNode(component, onCreatePortal, onRemovePortal) {
  return (node, editorView, getPosition, decorations) => {
    return new createNode({
      node,
      editorView,
      getPosition,
      decorations,
      component,
      onCreatePortal,
      onRemovePortal
    });
  };
}