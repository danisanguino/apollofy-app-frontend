import { useState } from 'react'
import './search.css'
import { getTracks } from '../../../utils/functions'

// type Props = {
//   setResults: string
//   artist: string
//   value: string
// }

export function Search({setResults}: Props) {

  const [input, setInput] = useState("")

  const searchFetchMusicData =  (value) => {
    fetch("http://localhost:3000/tracks")
    .then((response)=> response.json())
    .then((json) => {
      const results =json.filter((artist) => {
        return artist && artist.artist && artist.artist.toLowerCase().includes(value)
      });
    setResults(results) 
    })
  }

  const handleChange = (value) => {
    setInput(value)
    searchFetchMusicData(value)
  }

  return (
    <input
      type="text"
      className="search"
      placeholder="Search"
      value={input}
      onChange={(e) => handleChange(e.target.value)}
    />
  )
}
