import React from "react";

function Input({
  type = "text",
  disabled = false,
  placeholder = "",
  value,
  onChange,
  label,
}) {
  return (
    <div>
      {label && (
        <label className="text-xs font-semibold mb-2 inline-block">
          {label}
        </label>
      )}
      <input
        className="w-full h-[38px] text-xs font-normal px-3 py-[10px] text-[#7E7E7E] bg-[#F9FBFF] rounded-[10px] border-[1px] border-white focus:outline-none focus:border-primary focus:border-[1px]"
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
