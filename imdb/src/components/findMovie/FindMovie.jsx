import { useSelector, useDispatch } from 'react-redux'
import { wantToSeeAdded } from '../../reducers/wantToSeeSlice';
import { alreadySeenAdded } from '../../reducers/alreadySeenSlice';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './FindMovie.css';
import { Eye, BookmarkStar } from 'react-bootstrap-icons';

function FindMovie(){
    const dispatch = useDispatch();
    const { movieName } = useParams();
    const alreadySeen = useSelector(state => state.alreadySeen);
    const wantToSee = useSelector(state => state.wantToSee);
    const [ movie, setMovie ] = useState({});
    const [ invalidMovie, setInvalidMovie ] = useState(true);
    const [ isModalOpen, setIsModalOpen] = useState(false);
    const [ isAlreadySeen, setIsAlreadySeen] = useState(false);
    const [ isWantToSee, setIsWantToSee] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);

        setTimeout(() => {
            setIsModalOpen(false);
            },5000)
    }

    useEffect(() => {
        async function fetchMovie() {
            try{
                fetch('http://www.omdbapi.com/?t='+movieName+"&apikey=186be766")
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        if(data.Response==='False'){
                            setInvalidMovie(true);
                        }
                        else{
                            setInvalidMovie(false);
                            setMovie(data);
                            if(alreadySeen.find(movie => movie.id===data.imdbID)){
                                setIsAlreadySeen(true);
                            }
                            else{
                                setIsAlreadySeen(false);
                            }
                            if(wantToSee.find(movie => movie.id===data.imdbID)){
                                setIsWantToSee(true);
                            }
                            else{
                                setIsWantToSee(false);
                            }
                        }
                    });
            }
            catch{
                console.log('No data From Server');
            }            
        }
    
        fetchMovie();
    }, [movieName,alreadySeen,wantToSee]);

    const setWatched = () => {
        dispatch(alreadySeenAdded({id:movie.imdbID, title: movie.Title}))
        openModal();
    }

    const setWant = () => {
        dispatch(wantToSeeAdded({id:movie.imdbID, title: movie.Title}))
        openModal();
    }

    const handleCloseModal = ()=>{
        setIsModalOpen(false);
    }

    return(
        <div className='movie'>
            {invalidMovie?<div className='movie__not-found'>Movie Not Found</div>:
            <div className='movie__found'>
                {movie.Poster!=="N/A" &&
                    <div className='col'>
                        <img alt={movie.Title} src={movie.Poster}></img>
                    </div>}
                <div>                
                    <div className='row'>                        
                        <div className='col'>
                            <div className='movie__title'>
                                {movie.Title}
                            </div>                        
                            <div>
                                {movie.Runtime}
                            </div>
                        </div>
                        <div className='col'>
                            <div className='movie__year'>
                                {movie.Year}
                            </div>
                        </div>
                    </div>
                    <div className='movie__genre'>
                        Genre - <b>{movie.Genre}</b>
                    </div>
                    <div>
                        Director - {movie.Director}
                    </div>
                    <div>
                        Actors - {movie.Actors}
                    </div>                
                    <div>
                        {movie.Country}
                    </div>
                    <div className='row m-5'>
                        <div className='col'>        
                            <div>
                                {movie.Plot}
                            </div>                        
                        </div>
                        <div className='col'>
                            <h3>Rating:</h3>   
                            <div>
                                IMDB - {movie.imdbRating} - Votes - {movie.imdbVotes}
                            </div>
                            {movie.Ratings.map(rating=>
                                <div key={rating.Source}>
                                    {rating.Source} - {rating.Value}
                                </div>
                                )}
                        </div>
                    </div>
                    {isAlreadySeen?
                        <div className='movie__added'>
                            Added to Watched 
                        </div>
                        :
                        <button className='btn btn-outline-secondary' onClick={setWatched}>Watched <Eye/></button>
                    }
                    {isWantToSee?
                        <div className='movie__added'>
                            Added to Want To See
                        </div>
                        :
                        <button className='btn btn-outline-success' onClick={setWant}>Want To See <BookmarkStar/></button>
                    }
                    
                </div>
            </div>
            }
            {isModalOpen && (
                <div className="modal-content">
                    <h2>Movie Added</h2>
                    <button className="btn btn-success" onClick={handleCloseModal}>OK</button>
                </div>
            )}
        </div>
    )

}

export default FindMovie;