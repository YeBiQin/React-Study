// 引入节点视图创建函数
import { createEditorNode } from "../../../components/prosemirror/createEditorNode";

// 引入节点组件
import Paragraph from "../../../components/prosemirror/nodes/paragraph";
import AgendaItem from "../../../components/prosemirror/nodes/agendaItem";
import AgendaTitle from "../../../components/prosemirror/nodes/agendaTitle";

// 组装Agenda视图节点
export function AgendaViews() {
  const nodeViews = Object.create(Array);
  [AgendaItem, AgendaTitle, Paragraph].forEach((item) => {
    nodeViews[item.parseName] = new createEditorNode(item);
  });
  return nodeViews;
}