import React from "react";
import "./Select.scss";

function Select({ options = [], disabled = false, value, onChange }) {
  return (
    <div className="select-container">
      <select value={value} onChange={onChange} disabled={disabled}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
