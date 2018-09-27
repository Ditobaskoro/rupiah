import React from 'react';

const InputText = ({value, onChange, placeHolder, maxLen}) => {
  return (
    <input
          type="text"
          name="inputField"
          className="form-control"
          onChange={onChange}
          value={value}
          placeholder={placeHolder}
          maxLength={maxLen}
          />
  );
};

export default InputText;