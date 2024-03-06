import React from 'react'
import "./search.css"
import { SearchResult } from './SearchResult'

type Props = {}

export default function SearchResultList({ results }) {
  return (
    results.map((results, id) => {
        return (
            <SearchResult results={results} key={id}/>
        )
    })
  )
}