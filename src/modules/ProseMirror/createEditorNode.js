export class createEditorNode {
  constructor(node) {
      this.dom = document.createElement('div');
      this.dom.classList.add(`richEditor-${node.type.name}`);
      // 判断是否是末尾节点，如果不是则证明还有子节点
      if (!node.isLeaf) {
          this.contentDOM = document.createElement('div');
          this.contentDOM.classList.add(`richEditor-content`);
          this.dom.appendChild(this.contentDOM);
      }
  }
}