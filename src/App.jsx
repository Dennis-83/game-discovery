import {Routes, Route, NavLink, Navigate} from 'react-router-dom';
import './App.css'
import Home from "./pages/home/Home.jsx";
import Discovery from "./pages/discovery/Discovery.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Search from "./pages/search/Search.jsx";
import Favorites from "./pages/favorites/Favorites.jsx";
import Gamedetails from "./pages/gamedetails/Gamedetails.jsx";
import profileIcon from './assets/profile-picture.png';
import {FavoritesProvider} from "./contexts/FavoritesContext.jsx";

function App() {

    const isLoggedIn = false;

    return (
        <>
            <FavoritesProvider>
                <header>
                    <nav className="nav-container">
                        <ul className="nav-list">
                            <div className="nav-links-left">
                                <li>
                                    <NavLink to="/"
                                             className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/search"
                                             className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Search</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/favorites"
                                             className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Favorites</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/discovery"
                                             className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Discovery</NavLink>
                                </li>
                            </div>
                            <div className="nav-link-right">
                                <li className="profile-link"><NavLink to="/profile"
                                                                      className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
                                    <img src={profileIcon} alt="Profile" className="profile-icon"/>
                                </NavLink></li>
                            </div>
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/gamedetails/:id" element={<Gamedetails/>}/>
                    <Route path="/discovery" element={<Discovery/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={isLoggedIn === true ? <Profile/> :
                        <Navigate to="/"/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                </Routes>
            </FavoritesProvider>
        </>
    );
}

export default App
