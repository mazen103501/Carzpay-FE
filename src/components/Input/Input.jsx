import React from "react";

function Input({
  type = "text",
  disabled = false,
  placeholder = "",
  value,
  onChange,
  label,
  cssClasses = "",
}) {
  return (
    <div>
      {label && (
        <label className="text-xs font-semibold mb-2 inline-block">
          {label}
        </label>
      )}
      <input
        className={`w-full h-[38px] text-xs font-medium px-3 py-[10px] text-inputsColor bg-lightBlue rounded-[10px] border-[1px] border-lightGray focus:outline-none focus:border-primary focus:border-[1px] ${cssClasses}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
