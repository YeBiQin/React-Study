// const AgendaHeader = ({ context }) => {
//   const componentRef = (dom) => {
//     dom && dom.appendChild(context.contentDOM);
//   }
//   return (
//     <div className="agenda-header">
//        <div ref={componentRef}></div>
//     </div>
//   )
// }
// AgendaHeader.parseName = "agendaHeader";

import React, { forwardRef } from "react";
const AgendaHeader = forwardRef((props, ref) => {
  return (
    <div className="agenda-header">
      <div className="agenda-selectIcon"></div>
      <div className="agenda-title" ref={ref}>{props.children}</div>
      <div className="agenda-selectTime"></div>
    </div>
  )
});
AgendaHeader.parseName = "agendaHeader";

export default AgendaHeader;