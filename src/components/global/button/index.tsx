import { ReactNode } from "react";
import "./button.css";

type Props = {
  children?: ReactNode,
  style: string,
  handleClick?: () => void,
  value?: string

};

export function Button(props: Props) {
  return <button className={props.style} value={props.value} onClick={props.handleClick}>{props.children}</button>;
}
