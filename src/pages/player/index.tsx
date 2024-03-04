import Page from "../../components/layout/page";
import "./player.css";

type Props = {};

export function Player({}: Props) {
  return (
    <Page>
      <section className="songCard">
        <img
          className="songPhoto"
          src="https://res.cloudinary.com/dqm1upnhh/image/upload/v1709489523/02_T-Rex.jpg"
        />
        <h2 className="songInfoTitle">I Love To Boggie</h2>
        <p className="songInfoArtist">T-Rex</p>
      </section>
      <section className="playerSection">
        <button>
          <img src="src/assets/images/player/back.svg" />
        </button>
        <button>
          <img src="src/assets/images/player/rewind.svg" />
        </button>
        <button>
          <img src="src/assets/images/player/play.svg" />
        </button>
        <button>
          <img src="src/assets/images/player/forward.svg" />
        </button>
        <button>
          <img src="src/assets/images/player/next.svg" />
        </button>
      </section>
    </Page>
  );
}
