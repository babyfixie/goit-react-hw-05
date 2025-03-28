import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import style from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=cf90c7e71cb3b075c8b58dd255fc4b7b`
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };

    if (movieId) {
      fetchMovieCast();
    }
  }, [movieId]);

  if (!cast.length) {
    return <p>No cast information available.</p>;
  }

  return (
    <div>
      <ul className={style.castList}>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className={style.actorImage}
              />
            )}
            <div className={style.actorInfo}>
              <p>
                <strong>{actor.name}</strong>
              </p>
              <p>{actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
