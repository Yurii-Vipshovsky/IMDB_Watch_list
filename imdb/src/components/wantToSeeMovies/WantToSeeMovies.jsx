import { useSelector, useDispatch } from 'react-redux'
import { wantToSeeDeleted } from '../../reducers/wantToSeeSlice';
import { alreadySeenAdded } from '../../reducers/alreadySeenSlice';
import "./WantToSeeMovies.css"
import { useNavigate } from 'react-router-dom';
import { Check2Circle, Trash } from 'react-bootstrap-icons';


function WantToSeeMovies(){

    const wantToSee = useSelector(state => state.wantToSee);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id) =>{
        dispatch(wantToSeeDeleted(id));
    }

    const handleOpenMovie = (title) =>{
        const movieNameUsingPluses = title.replace(/ /g, '+');
        navigate("/findMovie/" + movieNameUsingPluses);
    }

    const moveToWatched = (id, title) =>{
        handleDelete(id);
        dispatch(alreadySeenAdded({id:id, title:title}))
    }

    return(
        <>
            <h1>Want To See</h1>
            {wantToSee.length<1 && <><h1 className='movie__not-found'>No Movies Yet!</h1> <h1>Add some Movies!</h1></>}
            <ol className="list-group list-group-numbered">
                {wantToSee.map(movie=>
                    <li className='want-to-see-movie list-group-item' key={movie.id}>
                        <div className='want-to-see-movie__title' onClick={()=>{handleOpenMovie(movie.title)}} >{movie.title}</div>
                        <button className='btn btn btn-success' onClick={()=>{moveToWatched(movie.id, movie.title)}}>Watched <Check2Circle/></button>
                        <Trash className='want-to-see-movie__delete' onClick={()=>{handleDelete(movie.id)}}/>
                    </li>
                )}
            </ol> 
        </>
    )

}

export default WantToSeeMovies;