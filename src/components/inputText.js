import React from 'react';

const InputText = ({value, onChange, placeHolder}) => {
  return (
    <input
          type="text"
          name="inputField"
          className="form-control"
          onChange={onChange}
          value={value}
          placeholder={placeHolder}
          />
  );
};

export default InputText;