import { ReactNode } from "react";
import "./button.css";

type Props = {
  children: ReactNode;
};

export function Button(props: Props) {
  return <button className="btn">{props.children}</button>;
}
