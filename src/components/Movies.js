import React from "react";

export default function Movies({movies, showDetails}) {
  return (
    <div className="movies">
      {movies.map((item) => (
          <img
            onClick={() => showDetails(item)}
            key={item.imdbID}
            src={item.Poster}
            alt={item.Title}
          />
      ))}
    </div>
  );
}
