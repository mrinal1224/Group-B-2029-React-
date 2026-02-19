import React from 'react'

function MovieCard({posterUrl , title}) {
  return (
    <div  className='w-62.5 h-100 bg-cover rounded-2xl' style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${posterUrl})`}}>
       <h4>{title}</h4>
    </div>
  )
}

export default MovieCard