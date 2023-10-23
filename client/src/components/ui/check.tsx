import React from "react";
import { Label } from "@ui/label";

interface CheckProps {
  id: string;
  checked: boolean;
  labelMessage: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Check: React.FC<CheckProps> = ({
  id,
  checked,
  labelMessage,
  onChange,
}) => {
  return (
    <label className="material-checkbox">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="custom-checkbox"
      />
      <span className="checkmark"></span>
      <Label htmlFor={id}>{labelMessage}</Label>
    </label>
  );
};

export default Check;
