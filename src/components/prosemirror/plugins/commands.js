import { redo, undo } from "prosemirror-history";

// 链式处理函数
function chainProcessing({ items, ...args }) {
  for (let item of items) {
    if (item(args)) {
      return true;
    }
  }
  return false;
}

// 段落缩进
function addIndent(isIndent) {
  return function (state, dispatch) {
    if (dispatch) {
      const $tr = state.tr;
      const { from, to } = state.selection;
      // 获取选择范围内的所有节点
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.attrs.indent !== undefined) {
          console.log("执行", node.type);

          const { indent } = node.attrs;
          // 增加缩进
          if (isIndent && indent !== 6) {
            $tr.setNodeMarkup(pos, node.type, {
              ...node.attrs,
              indent: indent + 1,
            });
          }
          // 减少缩进
          if (!isIndent && indent !== 0) {
            $tr.setNodeMarkup(pos, node.type, {
              ...node.attrs,
              indent: indent - 1,
            });
          }
        }
      });
      dispatch($tr);
    }
    return true;
  };
}
// 节点切割
function splitBlock(state, dispatch) {
  console.log(state);
  // const $from = state.selection.$from;
  // if ($from.parent.type.name !== "agendaHeader") {
  //   const $tr = state.tr;
  //   if (!state.selection.empty) {
  //     $tr.deleteSelection();
  //   }

  //   if (
  //     ($from.nodeBefore && $from.nodeAfter) ||
  //     (!$from.nodeBefore && !$from.nodeAfter)
  //   ) {
  //     dispatch($tr.split($from.pos).scrollIntoView());
  //   }
  // }
  return true;
}

// 删除选择的内容
function deleteSelection({ state, dispatch }) {
  // 如果存在多选内容则进行处理，否则放行
  if (!state.selection.empty) {
    const $tr = state.tr;
    dispatch($tr.deleteSelection().scrollIntoView());
    return true;
  }
  return false;
}
// 改变段落属性
function modifyNodeType({ state, dispatch }) {
  return false;
}
// 向上合并段落
function mergeBackward({ state, dispatch }) {
  const $cursor = state.selection.$cursor;
  // 只有光标处于当前节点的起点时，才会执行向上合并的处理
  if ($cursor && $cursor.pos === $cursor.start()) {
    const $tr = state.tr;
    dispatch($tr.delete($cursor.pos - 2, $cursor.pos).scrollIntoView());
    return true;
  }
  return false;
}
// 向下合并段落
function mergeForward({ state, dispatch }) {
  const $cursor = state.selection.$cursor;
  if ($cursor && $cursor.nodeBefore && !$cursor.nodeAfter) {
    const $tr = state.tr;
    dispatch($tr.delete($cursor.pos, $cursor.pos + 2).scrollIntoView());
    return true;
  }
  return false;
}

// 删除节点
function deleteNode({ state, dispatch }) {
  const $cursor = state.selection.$cursor;
  // 只有光标处于当前节点的不存在内容时，才会删除该节点
  if ($cursor && !$cursor.nodeBefore && !$cursor.nodeAfter) {
    const $tr = state.tr;
    dispatch($tr.delete($cursor.pos - 1, $cursor.pos + 1).scrollIntoView());
    return true;
  }
  return false;
}

// 操作指令处理对象
const chainCommands = {
  delete(...items) {
    return function (state, dispatch, view) {
      return chainProcessing({ state, dispatch, view, items });
    };
  },
  backspace(...items) {
    return function (state, dispatch, view) {
      return chainProcessing({ state, dispatch, view, items });
    };
  },
};

export const keymaps = {
  "Mod-z": undo,
  "Mod-y": redo,
  Enter: splitBlock,
  Delete: chainCommands.delete(deleteSelection, mergeForward, deleteNode),
  Backspace: chainCommands.backspace(deleteSelection, mergeBackward),
};
