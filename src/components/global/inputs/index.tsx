import { ChangeEvent } from "react";
import "./input.css";

type Props = {
  type?: string;
  name: string;
  placeholder: string;
  handleChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
};

export const Inputs = (props: Props) => {
  return (
    <input
      onChange={props.handleChange}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      className="input"
      required
    />
  );
};
