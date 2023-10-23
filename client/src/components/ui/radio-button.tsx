import React from "react";
import { Label } from "@ui/label";

interface RadioButtonProps {
  id: string;
  value: string;
  checked: boolean;
  labelMessage: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  value,
  checked,
  labelMessage,
  onChange,
}) => {
  return (
    <div className="radio flex items-center">
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <Label className="radio-label" htmlFor={id}>
        {labelMessage}
      </Label>
    </div>
  );
};

export default RadioButton;
