import "./input.css"

type Props = {
  type?: string
  name: string
  placeholder: string
}

export const Inputs = (props: Props) => {
  return (
    <input type={props.type} name={props.name} placeholder={props.placeholder} className="input" />
  )
}