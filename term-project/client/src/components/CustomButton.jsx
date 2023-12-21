
import React from "react";

const CustomButton = ({ title, onClick, containerStyles }) => {
  return (
    <button className={containerStyles} onClick={onClick}>
      {title}
    </button>
  );
};

export default CustomButton;
