import React from "react";

const EditInputLabel = ({
  labelText,
  name,
  inputValue,
  onChange,
  type = "text",
  options = [],
}) => {
  return (
    <label className="form-control w-full max-w-xs my-2">
      <div className="label">
        <span className="label-text">{labelText}</span>
      </div>
      {type === "select" ? (
        <select
          name={name}
          value={inputValue}
          onChange={onChange}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">Select {labelText}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type="text"
          value={inputValue}
          onChange={onChange}
          className="input input-bordered w-full max-w-xs"
          placeholder={
            type === "array" ? "Comma-separated values (e.g. JS, React)" : ""
          }
        />
      )}
    </label>
  );
};

export default React.memo(EditInputLabel);
