import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import "./Gamedetails.css";
import {FavoritesContext} from "../../contexts/FavoritesContext.jsx";

function GameDetails() {
    const {id} = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const {favorites, addFavorite, removeFavorite} = useContext(FavoritesContext);


    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${import.meta.env.VITE_API_KEY}`);
                setGame(response.data);
            } catch (error) {
                console.error('Fout bij ophalen game details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGameDetails();
    }, [id]);

    if (loading) return <p>Bezig met laden...</p>;
    if (!game) return <p>Game niet gevonden.</p>;

    const isFav = favorites.some(fav => fav.id === game.id);

    return (
        <section className="game-details-wrapper">
            <h1>{game.name}</h1>
            <img src={game.background_image} alt={game.name} width="300"/>
            <p dangerouslySetInnerHTML={{__html: game.description}}/>
            <p><strong>Releasedate:</strong> {game.released}</p>
            <p><strong>Rating:</strong> {game.rating} / 5</p>
            <p><strong>Developers:</strong> {game.developers.map(dev => dev.name).join(', ')}</p>
            <p><strong>Publishers:</strong> {game.publishers.map(pub => pub.name).join(', ')}</p>
            <p><strong>Platforms:</strong> {game.platforms.map(p => p.platform.name).join(', ')}</p>
            <button
                className="favorite-toggle-button"
                onClick={() => isFav ? removeFavorite(game.id) : addFavorite({
                    id: game.id,
                    name: game.name,
                    background_image: game.background_image
                })}
            >
                {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </section>
    );
}

export default GameDetails;
