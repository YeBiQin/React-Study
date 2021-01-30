import React, { forwardRef } from "react";

const AgendaItem = forwardRef(({ children, deleteNode, editorView }, ref) => {
  return (
    <div className="agenda-item">
      <div className="agenda-handler" contentEditable={false}>
        <div className="agenda-drag ly-icon_icon-setting" onClick={deleteNode} />
        <div className="agenda-delete ly-icon_delete" />
        {/* {editorView.state.doc.childCount !== 1 && <div className="agenda-delete ly-icon_delete" />} */}
      </div>
      <div className="agenda-container" ref={ref}>
        {children}
      </div>
    </div>
  )
});
AgendaItem.parseName = "agendaItem";

export default AgendaItem;