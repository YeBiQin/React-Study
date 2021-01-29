import placeholder from "./plugins";
import { keymaps } from "./commands";
import { createEditorNode } from "./createEditorNode";

import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
// prosemirror其他功能
import { schema } from "../../utils/proseMirrorSchema";
import { keymap } from "prosemirror-keymap"
import { history } from "prosemirror-history"
// 获取自定义渲染段落结构的组件
import { agendaList } from "./agendaComponents";


export function createEditorView(dom) {
  // 初始化富文本状态 - 通过基础规则schema创建并保持新的state引用
  const editorState = EditorState.create({
    schema,
    plugins: [
      // 设置快捷键
      keymap(keymaps),
      history(),
      placeholder({
        agendaHeader: "Please enter the title of the agenda",
        agendaBodyer: "Please input agenda content"
      })
    ]
  });

  // 自定义渲染段落结构
  const nodeViews = Object.create(Array);
  agendaList.forEach((item) => {
    nodeViews[item.parseName] = new createEditorNode(item);
  });

  // 使用状态editorState创建编辑器视图，并附加到body节点。
  return new EditorView(dom, {
    state: editorState,
    nodeViews,
    dispatchTransaction(transaction) {
      this.updateState(this.state.apply(transaction));  // 更新数据
    }
  });
}