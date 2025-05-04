import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import "./Search.css";
import {Link} from "react-router-dom";


function Search() {
    const {register, handleSubmit} = useForm();
    const [results, setResults] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);


    const API_KEY = import.meta.env.VITE_API_KEY;

    async function fetchData(data) {
        const query = data.query;
        const url = `https://api.rawg.io/api/games?search=${query}&key=${API_KEY}`;

        try {
            const response = await axios.get(url);
            console.log("Gevonden data:", response.data);
            setResults(response.data.results);
            setNextUrl(response.data.next);
            setPrevUrl(response.data.previous);
        } catch (e) {
            console.error("Error bij ophalen van data:", e);
        }
    }

    async function fetchDataFromUrl(url) {
        if (!url) return;
        try {
            const response = await axios.get(url);
            setResults(response.data.results);
            setNextUrl(response.data.next);
            setPrevUrl(response.data.previous);
        } catch (e) {
            console.error("Error bij bladeren door pagina", e);
        }
    }


    return (
        <section className="search-page-wrapper">
            <div className="search-bar">
                <form onSubmit={handleSubmit(fetchData)} className="search-form">
                    <input
                        type="text"
                        placeholder="Insert title..."
                        {...register("query", {required: true})}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>

            <div className="search-results">
                {results.length > 0 ? (
                    <ul>
                        {results.map((game) => (
                            <li key={game.id}>
                                <Link to={`/gamedetails/${game.id}`} className="game-link">
                                    {game.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Enter a game title above to begin.</p>
                )}
            </div>
            <div className="next-previous-buttons">
                <button type="button" onClick={() => fetchDataFromUrl(prevUrl)} disabled={!prevUrl}>Previous</button>
                <button type="button" onClick={() => fetchDataFromUrl(nextUrl)} disabled={!nextUrl}>Next</button>
            </div>

        </section>
    );
}

export default Search;
