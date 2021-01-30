import React, { forwardRef } from "react";
const AgendaBodyer = forwardRef((props, ref) => {
  return (
    <div className="agenda-bodyer" ref={ref}>{props.children}</div>
  )
});
AgendaBodyer.parseName = "agendaBodyer";

export default AgendaBodyer;