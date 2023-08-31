import React from "react";
import "./style.scss"
const CustomTextBox = React.forwardRef(
  (props:  React.HTMLProps<HTMLInputElement>, ref: any) => {
    return (
      <input
        ref={ref}
        {...props}
      />
    );
  }
);

export default CustomTextBox;
