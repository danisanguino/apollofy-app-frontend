import './smallCard.css';

type Props = {
  handleClick?: () => void;
  src: string;
  text1?: string;
  text2: string;
  class?: string;
};

export function SmallCard(props: Props) {
  return (
    <button className={props.class ?? 'song-card'} onClick={props.handleClick}>
      <img className="img-song" src={props.src} alt={props.text2} />
      <div className="song-info">
        <h3>{props.text1}</h3>
        <p>{props.text2}</p>
      </div>
    </button>
  );
}
