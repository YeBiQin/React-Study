import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export default (options) => {
  return new Plugin({
    props: {
      decorations(state) {
        const decs = [];
        state.doc.descendants((node, pos) => {
            console.log(options.hasOwnProperty(node.type.name));
            if (options.hasOwnProperty(node.type.name) && node.content.size === 0) {
              // decs.push(
              //   Decoration.node(pos, pos + node.nodeSize, {
              //     "class": "prose-empty-node",
              //     "data-placeholder": options[node.type.name]
              //   })
              // );
              decs.push(
                Decoration.widget(pos+1, document.createTextNode(options[node.type.name]))
              )
            }
        });

        return DecorationSet.create(state.doc, decs);
        // let doc = state.doc
        // if (doc.childCount == 1 && doc.firstChild.isTextblock && doc.firstChild.content.size == 0)
        //   return DecorationSet.create(doc, [Decoration.widget(1, document.createTextNode("Hello World!"))])
      }
    }
  });
};