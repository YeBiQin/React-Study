
import { redo, undo } from 'prosemirror-history';

// 链式处理函数
function chainProcessing({ items, ...args }) {
  for (let item of items) {
    if (item(args)) {
      return true;
    }
  }
  return false;
}
// 删除段落内容
function deleteContents({ state, dispatch }) {
  console.log("删除段落内容");
  return false;
}
// 改变段落属性
function modifyParagraph({ state, dispatch }) {
  console.log("改变段落属性");
  return false;
}
// 向上合并段落
function mergeBackward({ state, dispatch }) {
  console.log("向上合并段落");
  return false;
}
// 向下合并段落
function mergeForward({ state, dispatch }) {
  console.log("向上合并段落");
  return false;
}

// 操作指令处理对象
const commands = {
  addIndent(isIndent) {
    return function (state, dispatch) {
      if (dispatch) {
        let { from, to } = state.selection;
        // 获取选择范围内的所有节点
        state.doc.nodesBetween(from, to, (node, pos) => {
          if (node.attrs.indent != undefined) {
            // 增加缩进
            if (isIndent && node.attrs.indent !== 6) {
              node.attrs.indent++;
              // state.tr.setNodeMarkup(pos, node.type, {
              //   indent: node.attrs.indent++
              // });
            }
            // 减少缩进
            if (!isIndent && node.attrs.indent !== 0) {
              node.attrs.indent--;
              // state.tr.setNodeMarkup(pos, node.type, {
              //   indent: node.attrs.indent--
              // });
            }
          }
        });
        dispatch(state.tr.scrollIntoView());
      }
      return true;
    }
  },
  backspace(...items) {
    return function (state, dispatch, view) {
      return chainProcessing({ state, dispatch, view, items });
    }
  }
}

export const keymaps = {
  "Tab": commands.addIndent(true),
  "Mod-z": undo,
  "Mod-y": redo,
  "Backspace": commands.backspace(deleteContents, modifyParagraph, mergeBackward),
  "Shift-Tab": commands.addIndent(false),
}