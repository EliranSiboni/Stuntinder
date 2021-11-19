import "../styles/CardInfo.css";
import MoviesList from "./MoviesList";

const CardInfo = ({ name, movies }) => {
  return (
    <div className="information-wrapper">
      <div className="information-wrapper__items-wrapper">
        <h3 className="information-title">{name}</h3>
        <MoviesList movies={movies} />
      </div>
    </div>
  );
};

export default CardInfo;
