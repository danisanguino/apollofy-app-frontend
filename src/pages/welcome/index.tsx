import { useEffect, useState } from 'react';
import Page from '../../components/layout/page';
import { useUserContext } from '../../context/useUserContext';
import './welcome.css';
import { Track } from '../../utils/interfaces/track';
import { getTracks } from '../../utils/functions';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

export function Welcome() {
  const user = useUserContext();
  const [tracks, setTracks] = useState([] as Track[]);
  const slidesPerView = user.user.myFavorites.length / 1.5 + 0.5;
  useEffect(() => {
    async function setTracksAPI() {
      const TracksAPI = await getTracks();
      setTracks(TracksAPI);
    }
    setTracksAPI();
  }, []);
  return (
    <Page>
      <h1 className="welcomeTitle">Welcome</h1>
      <h1 className="welcome-user">{`${user.user.name} ${user.user.lastname}!`}</h1>
      <h3 className="newIn">New in this week!</h3>
      <section className="newInSection">
        {tracks
          .filter((track) => track.new)
          .slice(0, 6)
          .map((track) => {
            return (
              <Link key={track.id} to={`/${track.id}`}>
                <div className="albumCard">
                  <img
                    className="albumPhoto"
                    src={track.thumbnail}
                    alt={track.artist}
                  />
                  <p className="albumTitle">{track.artist}</p>
                </div>
              </Link>
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
              <SwiperSlide key={showSong?.id}>
                <Link to={`/${showSong?.id}`}>
                  <img className="albumFav" src={showSong?.thumbnail} />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
        ;
      </section>
    </Page>
  );
}
