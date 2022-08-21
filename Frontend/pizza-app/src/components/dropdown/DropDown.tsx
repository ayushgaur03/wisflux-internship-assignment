import React, { useState } from "react";
import "./DropDown.css";

interface SelectValue {
  label: string;
  value: string;
}

interface DropdownProps {
  dropdownOptions: Array<SelectValue>;
  handleChange: any;
}
const DropDown = ({ dropdownOptions, handleChange }: DropdownProps) => {
  const [dropdownValue, setDropdownValue] = useState<string>("small");
  return (
    <>
      <label className="dropdown-label">Size:</label>
      <select
        className="dropdown-select"
        value={dropdownValue}
        onChange={(e) => {
          setDropdownValue(e.target.value);
          handleChange(e.target.value);
        }}
      >
        {dropdownOptions.map((option, id) => (
          <option key={id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropDown;
