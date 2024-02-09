import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // import the CSS file

function Home({ isLoggedIn }) {
    const [movies, setMovies] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        } else {
            fetch('http://localhost:3000/movies')
                .then(response => response.json())
                .then(data => {
                    const categorizedMovies = data.reduce((acc, movie) => {
                        if (!acc[movie.genre]) {
                            acc[movie.genre] = [];
                        }
                        acc[movie.genre].push(movie);
                        return acc;
                    }, {});
                    setMovies(categorizedMovies);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="home-container">
            <h1>Welcome to the Movie Pass Home Page!</h1>
            {Object.keys(movies).map(genre => (
                <div key={genre}>
                    <h2>{genre}</h2>
                    <div className="movie-row">
                        {movies[genre].map(movie => (
                            <div key={movie.id} className="movie-card">
                                <img src={movie.poster} alt={movie.title} />
                                <h3>{movie.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;