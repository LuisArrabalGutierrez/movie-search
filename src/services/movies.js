const API_KEY='be5e4f5'


export const searchMovies= async ({query})=>{
    if( query === ''){
        return null
    }

    try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
        const json = await response.json()

        const movies = json.Search //extraemos las peliculas
  
        return  movies?.map(movie => ({ //mapeamos y adapatamos a otra estructura
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
        }))

    }
    catch(error){
        throw new Error('Error en la búsqueda fetch')
    }
    
}