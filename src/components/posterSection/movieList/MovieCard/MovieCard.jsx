import { useState } from 'react';
// import {navigate} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import ScreeningItem from '../../../UI/screeningItem/ScreeningItem';

import styles from './MovieCard.module.css';

const MovieCard = ({movie, openModal, selectedDate, dateList}) => {
    
    const {poster_Link, title, duration, rating, screeningInformation} = movie;

    const navigate = useNavigate();

    let createDataForModal = (dataScreening) => {
        const modalObj = {
            id: dataScreening["id"],
            title,
            duration,
            rating,
            cost: dataScreening["cost"],
            auditoriumId: dataScreening["auditoriumId"],
            quality: dataScreening["quality"]
        }
        console.log(modalObj);
        openModal(modalObj);
    }

    return ( 
        <div className={styles.moview__card} >
            <div className={styles.movie__img} onClick={() => {navigate(`/Movie/${movie.id}/${selectedDate}/${dateList[0]}` )}}>
                <img src={poster_Link} alt="movie" />
            </div>
            <div className={styles.movie__info}>
                <h2 className={styles.movie__name}>{title}</h2>
                <div className={styles.genres}>
                    {/* {genres.map((genre, index) => (
                        <div key={index} className={styles.genre}>{genre}</div>
                    ))} */}
                   <div className={styles.genre}>"Комедия"</div>
                   <div className={styles.genre}>"Приключения"</div>
                   <div className={styles.genre}>"Фэнтези"</div>
                </div>
                
                <div className={styles.screenings}>
                    {
                        screeningInformation.map((screening) => (
                            <ScreeningItem key={screening.id} screening={screening} createDataForModal={createDataForModal}  /> 
                        ))
                    }
                </div>
            </div>

               
        </div>
    );
}
 
export default MovieCard;