// const AgendaItem = ({ context }) => {
//   console.log(context);
//   const componentRef = (dom) => {
//     dom && dom.appendChild(context.contentDOM);
//   }
//   return (
//     <div>
//       <div className="agenda-dragHandler" contentEditable={false}>口</div>
//       <div ref={componentRef}></div>
//     </div>
//   )
// }

import React, { forwardRef } from "react";
const AgendaItem = forwardRef((props, ref) => {
  return (
    <div className="agenda-item">
      <div className="agenda-dragHandler" contentEditable={false}>口</div>
      <div className="agenda-container" ref={ref}>
        {props.children}
      </div>
    </div>
  )
});
AgendaItem.parseName = "agendaItem";

export default AgendaItem;