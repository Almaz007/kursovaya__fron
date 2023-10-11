import MovieCard from './MovieCard/MovieCard';

import styles from './movieList.module.css';

const MovieList = ({movies, dateList, selectedDate, openModal}) => {
    return ( 
        <div className={styles.movie__list}>
            {
                movies.length ? 
                movies.map((movie) => 
                    <MovieCard key={movie.id} movie={movie} dateList={dateList} selectedDate={selectedDate} openModal={openModal}/>
                ):
                "Загрузка....."
            }
        </div>
    );
}
 
export default MovieList;