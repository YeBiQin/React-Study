import React, { forwardRef } from "react";

const AgendaItem = forwardRef(({ children, deleteNode }, ref) => {
  return (
    <div className="agenda-item">
      <div className="agenda-handler" contentEditable={false}>
        <div className="agenda-drag">拖</div>
        <div className="agenda-delete" onClick={deleteNode}>删</div>
      </div>
      <div className="agenda-container" ref={ref}>
        {children}
      </div>
    </div>
  )
});
AgendaItem.parseName = "agendaItem";

export default AgendaItem;