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

export function Welcome() {
  const user = useUserContext();
  const [track, setTrack] = useState([] as Track[]);

  useEffect(() => {
    async function setTracksAPI() {
      const TracksAPI = await getTracks();
      setTrack(TracksAPI);
    }
    setTracksAPI();
  }, []);
  return (
    <Page>
      <h1 className="welcomeTitle">{`Welcome ${user.user.name} ${user.user.lastname}!`}</h1>

      <h3 className="newIn">New in this week!</h3>
      <section className="newInSection">
        {track
          .filter((tracks) => tracks.new)
          .slice(0, 6)
          .map((tracks) => {
            return (
              <div key={tracks.id} className="albumCard">
                <img
                  className="albumPhoto"
                  src={tracks.thumbnail}
                  alt={tracks.artist}
                />
                <p className="albumTitle">{tracks.artist}</p>
              </div>
            );
          })}
      </section>

      <h3 className="newIn">My favourites</h3>
      <section className="favouriteList">
        <Swiper
          slidesPerView={5}
          spaceBetween={16}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          // modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {track.map((tracks) => {
            return (
              <SwiperSlide key={tracks.id}>
                <img className="albumFav" src={tracks.thumbnail} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        ;
      </section>
    </Page>
  );
}
