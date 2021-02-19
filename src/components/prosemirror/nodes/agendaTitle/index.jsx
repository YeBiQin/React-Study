import React, { forwardRef } from "react";

const AgendaTitle = forwardRef((props, ref) => {
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
AgendaTitle.parseName = "agendaTitle";

export default AgendaTitle;