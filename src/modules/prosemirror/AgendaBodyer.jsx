// const AgendaBodyer = ({ context }) => {
//   const componentRef = (dom) => {
//     dom && dom.appendChild(context.contentDOM);
//   }
//   return (
//     <div className="agenda-bodyer">
//        <div ref={componentRef}></div>
//     </div>
//   )
// }
// AgendaBodyer.parseName = "agendaBodyer";


import React, { forwardRef } from "react";
const AgendaBodyer = forwardRef((props, ref) => {
  return (
    <div className="agenda-bodyer" ref={ref}>{props.children}</div>
  )
});
AgendaBodyer.parseName = "agendaBodyer";

export default AgendaBodyer;