
import { useRef, useState, useMemo, useCallback} from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies({query , sort}){ //custom hook 


    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const previousSearch = useRef(query)

    
  //con UseCallback para funciones
  const getMovies= useCallback( async (query) =>{

    if(query === previousSearch.current){
      return
    }

    try{
        previousSearch.current = query 
        setError(null)
        const newMovies= await searchMovies({query})
        setMovies(newMovies)
      }
    catch(error){
      setError(error)
    }

  }, [])

    //para ordenar en orden alfabetico, con useMemo para valores
    const sortedMovies = useMemo ( () => { 
      return sort
    ? movies.sort((a,b)=> a.title.localeCompare(b.title))
    : movies

    }, [sort, movies])

    return {movies, getMovies } //devuele un objeto que tiene una propiedad 
    // movies cuyo valor es mappedMOvies
  }
  