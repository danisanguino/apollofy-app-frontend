import  './header.css'


type Props = {}

export function Header({}: Props) {
  return (
    <header>
        <div className='container'>
        <img className='avatar' src="src/assets/images/danisanguino.png" alt="avatar" />
        <p>Hola, Dani!</p>
        </div>
        <button className="menu"><img  src="src/assets/images/menu-mobile.svg" alt="menu" /></button>
    </header>
  )
}