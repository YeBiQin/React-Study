
// 引入prosemirror模块
import { keymap } from "prosemirror-keymap";
import { history } from "prosemirror-history";
import applyDevTools from 'prosemirror-dev-tools';
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
// 引入自定义的功能组件
import { schema } from "./script/schema";
import { keymaps } from "../../components/prosemirror/plugins/commands";
import { AgendaViews } from "./script/nodes";
import { agendaPlaceholder as placeholder } from "../../components/prosemirror/plugins/placeholder";

export function createAgendaEditorView(dom) {
  // 初始化富文本状态 - 通过基础规则schema创建并保持新的state引用
  const editorState = EditorState.create({
    schema,
    plugins: [
      // 设置快捷键
      keymap(keymaps),
      history(),
      placeholder({
        paragraph: "Please input agenda content",
        agendaTitle: "Please enter the title of the agenda"
      })
    ]
  });

  // 创建富文本编辑视图
  const editorView = new EditorView(dom, {
    state: editorState,
    nodeViews: AgendaViews(),
    dispatchTransaction(transaction) {
      this.updateState(this.state.apply(transaction));  // 更新数据
    }
  });

  // 富文本开发调试工具
  applyDevTools(editorView);

  // 使用状态editorState创建编辑器视图，并附加到body节点。
  return editorView;
}