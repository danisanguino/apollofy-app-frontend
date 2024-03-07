import './squareCard.css';

type Props = {
  handleClick: () => void;
  src: string;
  text1: string;
  text2: string;
};

export function SquareCard(props: Props) {
  return (
    <button onClick={props.handleClick}>
      <div className="albumCard">
        <img className="albumPhoto" src={props.src} alt={props.text1} />
        <h3 className="artistTitle">{props.text1}</h3>
        <p className="albumTitle">{props.text2}</p>
      </div>
    </button>
  );
}
