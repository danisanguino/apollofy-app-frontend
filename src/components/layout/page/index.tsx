import { ReactNode } from 'react'
import { Header } from '../../global/header'

type Props = {
    children: ReactNode
}

export default function Page(props: Props) {
  return (
    <>
    <Header/>
    {props.children}
    </>
  )
}