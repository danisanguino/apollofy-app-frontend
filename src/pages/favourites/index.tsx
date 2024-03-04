import React, { useEffect, useState } from 'react'
import Page from '../../components/layout/page'
import "./favourites.css"
import { Track } from '../../utils/interfaces/track'
import { getTracks } from '../../utils/functions'

type Props = {}

export function Favourites({}: Props) {

    const [track, setTrack] = useState([]as Track[])

    useEffect(() => {
        async function setTracksAPI() {
            const TracksAPI = await getTracks();
            setTrack(TracksAPI);
        }
        setTracksAPI();
        }, []); 

  return (
    <Page>
        <h2 className='favourite-title'>I love them</h2>
        <section className='favourites-songs'>
            {track.map((tracks)=>{
                return (
                
                <div className='song-card' key={tracks.id}>
                <img className='img-song' src={tracks.thumbnail}/>
                <div className='song-info'>
                    <h3>{tracks.name}</h3>
                    <p>{tracks.artist}</p>
                </div>
            </div>

                )
            })}
            
        </section>
    </Page>
  )
}