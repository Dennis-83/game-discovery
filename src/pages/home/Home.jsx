import React from 'react';
import "./Home.css"
import {Link} from "react-router-dom";

function Home() {
    return (
        <div className="main-wrapper">
            <h1>Welcome to Game Discovery!</h1>
            <p>Discover new games</p>
            <button type="button">
                <Link to={'/search'} className="home-link">
                    <h2>Let's begin..</h2>
                </Link>
            </button>
        </div>
    );
}

export default Home;