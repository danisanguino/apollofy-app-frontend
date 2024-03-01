import { ChangeEvent } from "react"
import "./input.css"

type Props = {
  type?: string
  name: string
  placeholder: string
  handleChange?: (ev: ChangeEvent<HTMLInputElement>) => void
}

export const Inputs = (props: Props) => {
  return (
    <input type={props.type} name={props.name} placeholder={props.placeholder} className="input" onChange={props.handleChange} required />
  )
}