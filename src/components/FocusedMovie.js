import React from "react";
import Loader from "react-loader-spinner";

export default function FocusedMovie({
  movie,
  setFocusedMovie,
  setShowDetail,
}) {
  return (
    <div className={"focused-movie-popup"}>
      {movie ? (
        <div className="focused-movie">
          <img
            className="close-icon"
            src={process.env.PUBLIC_URL + "/close.png"}
            alt="close"
            onClick={() => {
              setShowDetail(false);
              setFocusedMovie();
            }}
          />
          <img src={movie.Poster} alt={movie.Title} />
          <div className="focused-movie-details">
            <span className="focused-movie-title">{movie.Title}</span>
            <span className="focused-movie-date">{movie.Released}</span>
            <div className="focused-movie-rate">
              <img
                className="star-icon"
                src={process.env.PUBLIC_URL + "/star.png"}
                alt="star"
              />
              <span>{movie.imdbRating}/10</span>
            </div>
            <div className="focused-movie-genre">
              {movie.Genre.split(",").map((item) => (
                <span>{item}</span>
              ))}
            </div>
            <p>{movie.Plot}</p>
          </div>
        </div>
      ) : (
        <Loader className='spinner' type="TailSpin" color="#FFD700" height={120} width={120}/>
      )}
    </div>
  );
}
