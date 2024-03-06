import { ChangeEvent, useState } from "react";
import "./search.css";

type Props = {
  param: Function;
};

export default function Search(props: Props) {
  const [searched, setSearched] = useState("");

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setSearched(ev.target.value);
    props.param(ev.target.value);
  };

  return (
    <input
      type="search"
      className="search"
      placeholder="Search"
      value={searched}
      onChange={handleChange}
    />
  );
}
