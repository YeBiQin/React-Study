import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export default (options) => {
  return new Plugin({
    props: {
      decorations(state) {
        const decs = [];
        state.doc.descendants((node, pos) => {
            if (options.hasOwnProperty(node.type.name) && node.content.size === 0) {
              decs.push(Decoration.widget(pos+1, document.createTextNode(options[node.type.name])))
            }
        });
        return DecorationSet.create(state.doc, decs);
      }
    }
  });
};