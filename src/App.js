import "./App.css";
import { useState, useRef } from "react";
import FocusedMovie from "./components/FocusedMovie";
import Movies from "./components/Movies";
import recommendations from "./recommendations.json";
import _ from "lodash";
const {REACT_APP_API_TOKEN} = process.env

function App() {
  const [movies, setMovies] = useState(recommendations);
  const searchBar = useRef();
  const [showDetail, setShowDetail] = useState(false)
  const [focusedMovie, setFocusedMovie] = useState();
  const fetchMovies = _.debounce(async () => {
    try{
      if (searchBar.current.value.length > 2) {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${searchBar.current.value}&apikey=${REACT_APP_API_TOKEN}`
        );
        if(response.ok){
          const data = await response.json();
          const filteredData = await data.Search?.filter((item, index) => {
            if (index < 8 && item.Poster !== "N/A") {
              return item;
            }
            return null;
          });
          filteredData.length? setMovies(filteredData) : setMovies(null)
          console.log(filteredData)
        } else {
          throw new Error('Algo deu errado')
        }
      } else {
        setMovies(recommendations);
      }
    } catch {
      setMovies('error')
    }
  }, 300)
  const showDetails = async (item) => {
    setShowDetail(true)
    const response = await fetch (`https://www.omdbapi.com/?i=${item.imdbID}&plot=full&apikey=${REACT_APP_API_TOKEN}`)
    const data = await response.json()
    setFocusedMovie(data);
  };
  return (
    <div className="App">
      {showDetail ? (
        <FocusedMovie 
          movie={focusedMovie} 
          setFocusedMovie={setFocusedMovie} 
          setShowDetail={setShowDetail}
        />
      ) : null}
      <div className="header">
        <h1 className="title">Movie Finder</h1>
        <input
          ref={searchBar}
          onChange={() => fetchMovies()}
          className="search-input"
          type="text"
          placeholder="E.g. Harry Potter"
        />
      </div>
      {(()=> {
        if(movies === "error") {
          return (
            <div className="not-fould">
              <img
                className="magnifying-glass"
                src={process.env.PUBLIC_URL + "/surprised.png"}
                alt="surprised"
              />
              <span className="not-fould-oops">Oops…</span>
              <span className="not-fould-text">
                Something went wrong on our end. Try to <span className='refresh' onClick={() => window.location.reload()}>refresh</span> the page.
              </span>
            </div>
          )
        }
        if(movies){
          return (
            <>
              <span className="intro-text">YOU MIGHT LIKE</span>
              <Movies movies={movies} showDetails={showDetails} />
            </>
          )
        }
        return (
          <div className="not-fould">
            <img
              className="magnifying-glass"
              src={process.env.PUBLIC_URL + "/magnifying-glass.png"}
              alt="magnifying-glass"
            />
            <span className="not-fould-oops">Oops…</span>
            <span className="not-fould-text">
              We couldn’t find that movie. Rephrase the search term and try again.
            </span>
          </div>
        )
      })()}
    </div>
  );
}

export default App;
