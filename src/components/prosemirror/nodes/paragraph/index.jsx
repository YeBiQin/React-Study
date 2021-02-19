import React, { forwardRef } from "react";
const Paragraph = forwardRef(({ children }, ref) => {
  return (
    <div className="agenda-bodyer" ref={ref}>{children}</div>
  )
});
Paragraph.parseName = "paragraph";

export default Paragraph;