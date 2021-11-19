import "../styles/MoviesList.css";

const MoviesList = ({ movies }) => {
  const moviesItems = movies.map((movie) => (
    <li className="movies-list__li">
      <span className="movies-list__item_title">{movie.title}</span>
      <span className="movies-list__item_actor">{movie.actor}</span>
    </li>
  ));

  return <ul className="movies-list-wrapper">{moviesItems}</ul>;
};

export default MoviesList;
