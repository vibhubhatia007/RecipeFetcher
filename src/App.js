import React,{ useEffect, useState} from 'react';
import Recipe from './Recipe'
import './App.css';

const App = () =>{

  const APP_ID = "043f3de0";
  const APP_KEY = "0db57a784b5dba46996f17eec9b19fcb";

  const exampleREq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const [counter, setCounter] = useState(0);

  const [recipes, setRecipes]= useState([]);
  const [search, setSearch]=useState("");
  const [query, setQuery]=useState('chicken')

  useEffect( ()=>{
    getRecipes ();
  }, [query]);

  const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
  // fetch(https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}).
  // then(response)
  // .data()

  }

  const updateSearch = e => {
    setSearch(e.target.value);
    // console.log('update');
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
    // console.log('search');
  }

  return(
    <div className="App">
     <form onSubmit={getSearch} className="search-form">
       <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
       <button  className="search-button" type="submit">search</button>
     </form>
     <div className="recipes">
    {recipes.map(recipe =>(
     <Recipe
     key={recipe.recipe.label}
     title={recipe.recipe.label} 
     calories={recipe.recipe.calories}
     image={recipe.recipe.image}
     ingredients={recipe.recipe.ingredients}
     />
    ))}
    </div>
    </div>
  )
}

export default App;
