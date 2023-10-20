import { useSelector, useDispatch } from 'react-redux'
import { alreadySeenRatingAdded, alreadySeenDeleted } from '../../reducers/alreadySeenSlice';
import "./AlreadySeenMovies.css"
import { useNavigate } from 'react-router-dom';
import { Star, StarFill, Trash } from "react-bootstrap-icons";


function AlreadySeenMovies(){

    const alreadySeen = useSelector(state => state.alreadySeen);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id) =>{
        dispatch(alreadySeenDeleted(id));
    }

    const handleOpenMovie = (title) =>{
        const movieNameUsingPluses = title.replace(/ /g, '+');
        navigate("/findMovie/" + movieNameUsingPluses);
    }

    const handleRatingChanged = (id, rating) =>{
        dispatch(alreadySeenRatingAdded({ id: id, rating: rating }));
    }

    function StarRating ({ rating, movieId }){
        const stars = [];
    
        for (let i = 1; i <= 5; i++) {
            const star = i <= rating ? <StarFill key={i} onClick={()=>{handleRatingChanged(movieId, i)}}/> : <Star key={i} onClick={()=>{handleRatingChanged(movieId, i)}}/>;
            stars.push(star);
        }
    
        return <div className="star-rating">{stars}</div>;
    };

    return(
        <>
            <h1>Watched</h1>
            {alreadySeen.length<1 && <><h1 className='movie__not-found'>No Movies Yet!</h1> <h1>Add some Movies!</h1></>}
            <ol className="list-group list-group-numbered">
                {alreadySeen.map(movie=>
                    <li className='watched-movie list-group-item' key={movie.id}>
                        <div className='watched-movie__title' onClick={()=>{handleOpenMovie(movie.title)}} >{movie.title}</div>
                        <StarRating rating={movie.rating} movieId={movie.id}/>
                        <Trash className='watched-movie__delete' onClick={()=>{handleDelete(movie.id)}}/>
                    </li>
                )}
            </ol>   
        </>
    )

}

export default AlreadySeenMovies;