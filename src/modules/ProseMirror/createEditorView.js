import placeholder from "./plugins";
import { keymaps } from "./commands";
import createNode from "./createEditorNode";

import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
// prosemirror其他功能
import { schema } from "../utils/proseMirrorSchema";
import { keymap } from "prosemirror-keymap"
import { history } from "prosemirror-history"

export default createEditorView((dom) => {
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
  // 使用状态editorState创建编辑器视图，并附加到body节点。
  const editorView = new EditorView(dom, {
    state: editorState,
    nodeViews: {
      agendaItem(node) {
        return new createNode(node)
      },
      agendaHeader(node) {
        return new createNode(node)
      },
      agendaBodyer(node) {
        return new createNode(node)
      }
    },
    dispatchTransaction(transaction) {
      editorView.updateState(editorView.state.apply(transaction));  // 更新数据
    }
  });
})