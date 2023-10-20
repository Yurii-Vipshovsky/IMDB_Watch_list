import { useState } from "react";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import './Header.css';

function Header(){
    const [movieName, setMovieName] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleMovieSearch = (event) => {
        event.preventDefault();
        if(movieName === ""){
            return;
        }
        const movieNameUsingPluses = movieName.replace(/ /g, '+');
        navigate("/findMovie/" + movieNameUsingPluses);
      };
    
    const handleInputChange = (event) => {
        setMovieName(event.target.value); 
    }

    return(
        <nav className="navbar navbar-light bg-light justify-content-between p-3 px-5 mb-5">
            {location.pathname === '/'?
                <Link className="navbar-brand navbar__active" to={'/'}>IMDB</Link>
                :
                <Link className="navbar-brand" to={'/'}>IMDB</Link>
            }
            {location.pathname === '/watched'?
                <Link className="nav-link navbar__active" to={'/watched'}>Watched</Link>
                :
                <Link className="nav-link" to={'/watched'}>Watched</Link>
            }
            {location.pathname === '/wantToSee'?
                <Link className="nav-link navbar__active" to={'/wantToSee'}>Want To See</Link>
                :
                <Link className="nav-link" to={'/wantToSee'}>Want To See</Link>
            }
            <form className="navbar__movie-search" onSubmit={handleMovieSearch}>
                <input className="form-control mr-sm-2" type="search"
                    placeholder="Search" aria-label="Search"
                    value={movieName}
                    onChange={handleInputChange}/>
                <button className="btn btn-outline-success my-2 my-sm-0" 
                    type="submit">Search</button>
            </form>
        </nav>
    )
}

export default Header;