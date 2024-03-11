import { useEffect, useState } from 'react';
import Page from '../../components/layout/page';
import { useUserContext } from '../../context/useUserContext';
import './welcome.css';
import { Track } from '../../utils/interfaces/track';
import { getArtist, getTracks } from '../../utils/functions';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { useSongContext } from '../../context/useSongContext';
import Search from '../../components/layout/search';
import { Artist } from '../../utils/interfaces/artist';
import { SquareCard } from '@/components/global/squareCard';
import { SmallCard } from '@/components/global/smallCard';
import { Link } from 'react-router-dom';

export function Welcome() {
  const [showSearch, setShowSearch] = useState({
    artists: [] as Artist[],
    tracks: [] as Track[],
  });
  const user = useUserContext();
  const { setCurrentSong, setIsPlaying } = useSongContext();
  const [tracks, setTracks] = useState([] as Track[]);
  const [artists, setArtists] = useState([] as Artist[]);
  const slidesPerView =
    user.user?.myFavorites.length < 3 ? user.user?.myFavorites.length : 3.5;

  useEffect(() => {
    async function setDataAPI() {
      const TracksAPI = await getTracks();
      const ArtistsAPI = await getArtist();
      setTracks(TracksAPI);
      setArtists(ArtistsAPI);
    }
    setDataAPI();
  }, [user.user]);

  return (
    <Page>
      <div className="search-container">
        <Search setShowSearch={setShowSearch} />
      </div>
      {showSearch.tracks.length === 0 && showSearch.artists.length === 0 ? (
        <>
          <h1 className="welcomeTitle">Welcome</h1>
          <h1 className="welcome-user">{`${user.user?.name} ${user.user?.lastname}!`}</h1>
          <h3 className="newIn">New in this week!</h3>
          <section className="newInSection">
            {tracks
              .filter((track) => track.new)
              .slice(0, 6)
              .map((track) => {
                return (
                  <SquareCard
                    key={track.id}
                    handleClick={() => {
                      setCurrentSong(track);
                      setIsPlaying(true);
                    }}
                    src={track.thumbnail}
                    text1={track.artist}
                    text2={track.name}
                  />
                );
              })}
          </section>

          <Link to="/favourites">
            <h3 className="newIn">My favourites</h3>
          </Link>
          <section className="favouriteList">
            <Swiper
              slidesPerView={slidesPerView}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
            >
              {user.user?.myFavorites.map((track) => {
                const showSong = tracks.find((t) => {
                  return t.id === track;
                });
                return (
                  <SwiperSlide
                    key={track}
                    onClick={() => {
                      setCurrentSong(showSong);
                      setIsPlaying(true);
                    }}
                  >
                    <img className="albumFav" src={showSong?.thumbnail} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </section>

          {/* FAVOURITES LIST IN LAPTOP */}
          <section className="favouriteList-laptop">
            {user.user?.myFavorites.slice(0, 8).map((track) => {
              const showSong = tracks.find((t) => {
                return t.id === track;
              });
              return (
                <div
                  key={track}
                  onClick={() => {
                    setCurrentSong(showSong);
                    setIsPlaying(true);
                  }}
                >
                  <div className="container">
                    <img
                      className="albumFav-laptop"
                      src={showSong?.thumbnail}
                    />
                    <p className="albumFav-trackName">{showSong?.name}</p>
                  </div>
                </div>
              );
            })}
          </section>
        </>
      ) : (
        <section className="search-section">
          {showSearch.artists.length > 0 && (
            <>
              <h3 className="newIn">Artists</h3>
              {showSearch.artists.map((artist) => (
                <SmallCard
                  key={artist.id}
                  src={artist.photoUrl}
                  text2={artist.name}
                  class="searchContainer"
                />
              ))}
            </>
          )}
          {showSearch.tracks.length > 0 && (
            <>
              <h3 className="newIn">Tracks</h3>
              {showSearch.tracks.map((track) => (
                <SmallCard
                  key={track.id}
                  src={track.thumbnail}
                  text2={track.name}
                  handleClick={() => {
                    setCurrentSong(track);
                    setIsPlaying(true);
                  }}
                  class="searchContainer"
                />
              ))}
            </>
          )}
        </section>
      )}
      <h3 className="newIn artistsTitle">Artists</h3>
      <section className="section-artists">
        {artists.slice(0, 8).map((artist) => {
          return (
            <div key={artist.id} className="artist-card">
              <img
                className="artist-photo"
                src={artist.photoUrl}
                alt={artist.name}
              />
              <p>{artist.name}</p>
            </div>
          );
        })}
      </section>
    </Page>
  );
}
