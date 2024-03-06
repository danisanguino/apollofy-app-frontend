import React from 'react'
import "./search.css"

type Props = {}

export function SearchResult({ results }) {
  return (
    <div className='search-result'>{results.artist}</div>
  )
}