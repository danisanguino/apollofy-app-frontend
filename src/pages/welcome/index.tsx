import { useEffect, useState } from "react";
import Page from "../../components/layout/page";
import { useUserContext } from "../../context/useUserContext";
import "./welcome.css";
import { Track } from "../../utils/interfaces/track";
import { getArtist, getTracks } from "../../utils/functions";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useSongContext } from "../../context/useSongContext";
import Search from "../../components/layout/search";
import { Artist } from "../../utils/interfaces/artist";

export function Welcome() {
  const [showSearch, setShowSearch] = useState({
    artists: [] as Artist[],
    tracks: [] as Track[],
  });
  const user = useUserContext();
  const { setCurrentSong, setIsPlaying } = useSongContext();
  const [tracks, setTracks] = useState([] as Track[]);
  const [artists, setArtists] = useState([] as Artist[]);
  const slidesPerView = user.user.myFavorites.length / 1.5 + 0.5;

  useEffect(() => {
    async function setDataAPI() {
      const TracksAPI = await getTracks();
      const ArtistsAPI = await getArtist();
      setTracks(TracksAPI);
      setArtists(ArtistsAPI);
    }
    setDataAPI();
  }, []);

  function search(params: string) {
    const resultsSearchTracks = tracks.filter((track) => {
      return params && track.name.toLowerCase().includes(params.toLowerCase());
    });

    const resultsSearchArtist = artists.filter((artist) => {
      return params && artist.name.toLowerCase().includes(params.toLowerCase());
    });
    setShowSearch({
      tracks: resultsSearchTracks,
      artists: resultsSearchArtist,
    });
  }
  console.log(showSearch);

  return (
    <Page>
      <Search param={search} />
      {showSearch.tracks.length === 0 && showSearch.artists.length === 0 ? (
        <>
          <h1 className="welcomeTitle">Welcome</h1>
          <h1 className="welcome-user">{`${user.user.name} ${user.user.lastname}!`}</h1>
          <h3 className="newIn">New in this week!</h3>
          <section className="newInSection">
            {tracks
              .filter((track) => track.new)
              .slice(0, 6)
              .map((track) => {
                return (
                  <button
                    key={track.id}
                    onClick={() => {
                      setCurrentSong(track);
                      setIsPlaying(true);
                    }}
                  >
                    <div className="albumCard">
                      <img
                        className="albumPhoto"
                        src={track.thumbnail}
                        alt={track.artist}
                      />
                      <p className="albumTitle">{track.artist}</p>
                    </div>
                  </button>
                );
              })}
          </section>

          <h3 className="newIn">My favourites</h3>
          <section className="favouriteList">
            <Swiper
              slidesPerView={slidesPerView}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              className="mySwiper"
            >
              {user.user.myFavorites.map((track) => {
                const showSong = tracks.find((t) => {
                  return t.id === track;
                });

                return (
                  <SwiperSlide key={track}>
                    <button>
                      <img className="albumFav" src={showSong?.thumbnail} />
                    </button>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            ;
          </section>
        </>
      ) : (
        <>
          <h3 className="newIn">Artists</h3>
          {showSearch.artists.map((artist) => (
            <div className="searchContainer">
              <img src={artist.photoUrl} />
              <p key={artist.id}>{artist.name}</p>
            </div>
          ))}
          <h3 className="newIn">Tracks</h3>
          {showSearch.tracks.map((track) => (
            <div className="searchContainer">
              <img src={track.thumbnail} />
              <p key={track.id}>{track.name}</p>
            </div>
          ))}
        </>
      )}
    </Page>
  );
}
