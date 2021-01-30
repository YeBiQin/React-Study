import React, { forwardRef } from "react";
const AgendaHeader = forwardRef((props, ref) => {
  return (
    <div className="agenda-header">
      <div className="agenda-icon">
        <img className="agenda-icon_title" src="../../assets/image/icon_title.png"></img>
      </div>
      <div className="agenda-title" ref={ref}>{props.children}</div>
      <div className="agenda-selectTime">5 mins</div>
    </div>
  )
});
AgendaHeader.parseName = "agendaHeader";

export default AgendaHeader;