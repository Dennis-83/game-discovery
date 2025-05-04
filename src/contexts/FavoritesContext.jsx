import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (game) => {
        if (favorites.length < 10 && !favorites.some(fav => fav.id === game.id)) {
            setFavorites(prev => [...prev, game]);
        }
    };

    const removeFavorite = (gameId) => {
        setFavorites(prev => prev.filter(fav => fav.id !== gameId));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}
