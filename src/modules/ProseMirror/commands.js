
import { redo, undo } from 'prosemirror-history';
export const keymaps = {
  "Mod-z": undo,    
  "Mod-y": redo
}