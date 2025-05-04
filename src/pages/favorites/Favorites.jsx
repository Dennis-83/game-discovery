import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import './Favorites.css';
import {FavoritesContext} from "../../contexts/FavoritesContext.jsx";

function Favorites() {
    const {favorites, removeFavorite} = useContext(FavoritesContext);

    return (
        <div className="favorites-wrapper">
            <h1>Your Favorite Games</h1>

            <div className="favorite-games-list">
                {favorites.length > 0 ? (
                    <ul>
                        {favorites.map((game) => (
                            <li key={game.id}>
                                <NavLink to={`/gamedetails/${game.id}`} className="game-link">
                                    {game.name}
                                </NavLink>
                                <button onClick={() => removeFavorite(game.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No favorite games yet. Go to <NavLink to="/search" className="game-link">Search</NavLink> to add
                        some!</p>
                )}
            </div>
        </div>
    );
}

export default Favorites;
