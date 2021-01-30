import { Schema } from 'prosemirror-model';

// 配置对应节点的初始化参数
const nodes = {
  // [重点]每个schema必须定义一个顶层节点
  doc: {
    content: "agendaItem+"
  },
  agendaItem: {
    group: 'agendaItem',
    content: 'agendaHeader+ agendaBodyer+',
    toDOM(node) {
      return ['agendaItem', 0];
    },
    parseDOM: [{ tag: 'agendaItem' }]
  },
  agendaHeader: {
    attrs: {
      indent: { default: 0 },
      title: { default: "Agenda Title" }
    },
    content: "text*",
    parseDOM: [{ tag: "agendaHeader" }],
    toDOM: function () {
      return ["agendaHeader", 0];
    }
  },
  agendaBodyer: {
    attrs: {
      indent: { default: 0 },
      title: { default: "Agenda Content" }
    },
    content: "text*",
    parseDOM: [{ tag: "agendaBodyer" }],
    toDOM: function () {
      return ["agendaBodyer", 0];
    }
  },
  // 每个 NodeView 的最终叶子节点
  text: {
    group: "inline",
    inline: true
  }
}

// 配置内容编辑的结构
const marks = {
  // 斜体
  em: {
    // parseDOM与toDOM表示文档间的相互转化
    parseDOM: [
      { tag: "i" },
      { tag: "em" },
      { style: "font-style=italic" }
    ],
    toDOM: function () {
      return ["em"]
    }
  },
  // 下划线
  underline: {
    parseDOM: [
      { tag: 'u' },
      { style: 'text-decoration:underline' }
    ],
    toDOM: function () {
      return ['span', { style: 'text-decoration:underline' }]
    }
  }
}

/* 
 * nodes表示编辑器中可能会出现的节点类型以及它们嵌套的方式。
 * marks表示每个节点都包含着一套规则，用来描述prosemirror文档和Dom文档之间的关联。
 */
export const schema = new Schema({ nodes, marks });