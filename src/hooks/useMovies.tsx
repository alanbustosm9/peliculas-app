import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { Movie, MovieDBMoviesResponse } from '../interfaces/movieInterface';

interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

export const useMovies = () => {

    const [ isLoading, setIsLoading ] = useState(true)

    // No es inicializado como un arreglo porque es un objeto
    const [ moviesState, setMoviesState  ] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
    })

    const getMovies = async () => {

        //  Esta forma es para arreglar varias promesas anidadas 

        const nowPlayingPromise = movieDB.get<MovieDBMoviesResponse>('/now_playing')
        const popularPromise = movieDB.get<MovieDBMoviesResponse>('/popular')
        const topRatedPromise = movieDB.get<MovieDBMoviesResponse>('/top_rated')
        const upcomingPromise = movieDB.get<MovieDBMoviesResponse>('/upcoming')

        const resps = await Promise.all([ nowPlayingPromise, popularPromise, topRatedPromise, upcomingPromise ])

        setMoviesState({
            nowPlaying: resps[0].data.results,
            popular: resps[1].data.results,
            topRated: resps[2].data.results,
            upcoming: resps[3].data.results,
        })


        // const peliculas = resp.data.results
        // setPeliculasCine( peliculasCine )  
        
        setIsLoading( false )
    
    }



    

    useEffect(() => {
        // now_playing solo se llama la funcion creada
        getMovies()
        
    }, [])


    return {
        // Se hace un spread para enviar todo lo que hay dentro de moviesState
        ...moviesState,
        isLoading
    }


}
