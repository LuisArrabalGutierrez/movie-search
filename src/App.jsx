import './App.css'
import {Movies} from './components/Movies'
import {useMovies} from './hooks/useMovies'
import { useEffect, useRef, useState ,useCallback} from 'react'
import debounce from 'just-debounce-it'

function useSearch(){
  const [query, setQuery] = useState('') //estado del input
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(()=>{

    if(isFirstInput.current){
      isFirstInput.current = query === ''
      return
    }

    if( query === ''){
      setError('Ingrese un valor')
      return
    }
    if( query.length < 3){
      setError('Ingrese al menos 3 caracteres')
      return
    }

    setError(null)

  },[query])
  
  return {query, setQuery, error}
}//custom hook

function App() {

  const [sort, setSort] = useState(false)

  const {query, setQuery, error} = useSearch()
  const {movies,getMovies} = useMovies({query , sort})

  const debounceGetMovies= useCallback(
    debounce( (query) => {
    getMovies({query})
    
  },500)
  ,[getMovies])


  const handleSubmit = (event)=>{
    event.preventDefault() //evita que se recargue la página
   // const data = new window.FormData(event.target) //obtenemos los datos del formulario
   // const query = data.get('query') //obtenemos el valor del input
    //const {query} =Object.fromEntries(new window.FormData(event.target)) //obtenemos los datos del formulario
    //console.log(fields)

    //if( query === ''){
    //  return alert('Ingrese un valor')
    
    getMovies(query)
  }


  /*const counter=useRef(0) //useRef nos permite mantener el valor de una variable entre renderizaciones
  counter.current++
  console.log('render', counter.current) // render 1 , render 2 , render 3,...
*/

  const handleChange = (event)=>{//para controlar el valor del input y validar el formulario y buscar automaticamente al escribir
    const newSearch = event.target.value
    setQuery(newSearch)
    debounceGetMovies(newSearch)
  }


  const handleSort= () =>{

    setSort(!sort)
    
  }
  

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>

        <form className='form' onSubmit={handleSubmit}>

          <input  style={{ border: '1px solid transparent' , borderColor: error ? 'red ': 'transparent' }} onChange={handleChange} name={query} placeholder='Avengers, Matrix , ...' />
          
          <input type='checkbox' onChange={handleSort} checked={sort}/>
          <label className='ordenar'>Ordenar</label>

          <button  type='submit'>Buscar</button>
        </form>

        {error && <p style={{color : 'red' }} >{error}</p>}
      </header>

      <main>
        
         <Movies movies={movies}/>

      </main>
    </div>
  );
}

export default App;
