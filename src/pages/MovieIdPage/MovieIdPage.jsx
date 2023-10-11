import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching";
import { useNavigate } from 'react-router-dom';

import ScreeningService from "../../api/ScreeningService";
import MovieService from "../../api/MovieService";

import MyModal from "../../components/UI/myModal/MyModal";
import ScreeningInformation from "../../components/ScreeningInformation/ScreeningInformation";
import ScreeningItem from "../../components/UI/screeningItem/ScreeningItem";
import DateList from "../../components/UI/dateList/DateList";
import ChoiseElem from "../../components/UI/choiseElem/ChoiseElem";
import aboutMovie from "./svgElems/aboutMovie";
import movieTrailer from "./svgElems/movieTrailer";
import MovieFullInfo from "./MovieFullInfo/MovieFullInfo";

import styles from './movieIdPadge.module.css';

const MovieIdPage = () => {
    const navigate = useNavigate();

    const [movie, setMovie] = useState({});
    const [screeningsByDates, setScreeningsByDates] = useState([]);
    const [screeningsBySelecedtDate, setScreeningsBySelecedtDate] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dataForModal, setDataForModal] = useState({});
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [choiseIndex, setChoiseIndex] = useState(0);

    const params = useParams();

    const months = {
        1: 'Января',
        2: 'Февраля',
        3: 'Марта',
        4: 'Апреля',
        5: 'Мая',
        6: 'Июня',
        7: 'Июля',
        8: 'Августа',
        9: 'Сентября',
        10: 'Октября',
        11: 'Ноября',
        12: 'Декабря',
    }

    const [movieFetching, isMovieLoading, movieError] = useFetching(async (id) => {
        let response = await MovieService.getMovieById(id);
        setMovie(response.data);
    })
    
    const [fetchScreeningsByMovie, isScreeningLoading, errorScreening] = useFetching(async (date, movieId) => {
        let response = await ScreeningService.getScreeningsBySelectedMovieDate(date, movieId);
       
        const uniqueDate = [];
            response.data.forEach((screening) => {
            if(!uniqueDate.includes(screening["screening_start"].split("T")[0])) {
                uniqueDate.push(screening["screening_start"].split("T")[0]);
            }
        })
    
        setDates(uniqueDate);
        setSelectedDate(params.selectedDate);
        //sssetSelectedDate(uniqueDate[0]);

        const screeningsForDate = [];
        uniqueDate.forEach(date => {
            let newObj={};
            newObj["date"] = date;
            newObj["screenings"] = [];

            response.data.forEach(screening => {
                if(screening["screening_start"].split("T")[0] === date) {
                    newObj["screenings"].push(screening);
                }
            });
            screeningsForDate.push(newObj);
        })
        setScreeningsByDates(screeningsForDate);
    })
    
    useEffect(() => {
        movieFetching(params.id);
    }, [])
    useEffect(() => {
       if(selectedDate) {
        screeningsByDates.forEach(dateObj => {
            if(dateObj.date === selectedDate) {
                setScreeningsBySelecedtDate(dateObj["screenings"]);
            }
        })
        
       }
    }, [selectedDate])

    useEffect(() => {
        if(Object.keys(movie).length){
            fetchScreeningsByMovie(params.startDay, movie.id);
        }
    }, [movie])

    let createDataForModal = (dataScreening) => {
        const modalObj = {
            id: dataScreening["id"],
            title: movie.title,
            duration: movie.duration,
            rating: movie.rating,
            cost: dataScreening["cost"],
            auditoriumId: dataScreening["auditoriumId"],
            quality: dataScreening["quality"]
        }
        setDataForModal(modalObj);
        setShowModal(true);
    }

    const choiseData = [
        {
            icon: aboutMovie,
            text: "О фильме"
        },
        {
            icon:movieTrailer,
            text: "Трейлер"
        }
    ]
    const MovieData = [
        <MovieFullInfo movie={movie} months={months}/>
    ]
    const changeChoise = (index) => {
        if(index !== choiseIndex) {
            setChoiseIndex(index)
        }
    }
    return ( 
        <>
        {movieError && <h1 style={{textAlign: 'center'}}>Произошла ошибка {movieError}</h1>}
            {
                isMovieLoading
                ? 
                <div className="container">
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>...Загрузка</div>
                </div>
                :  
                <section>
                <div className="container">
                    <div className={styles.movie}>
                        <div className={styles.all__movies__btn} onClick={() => {navigate('/Poster')}}>
                            <div className={styles.btn__icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path className={styles.btn__icon__svg} d="M16.8501 21.1C17.1001 20.85 17.2251 20.554 17.2251 20.212C17.2251 19.87 17.1001 19.5743 16.8501 19.325L9.5251 12L16.8751 4.65C17.1084 4.41667 17.2251 4.125 17.2251 3.775C17.2251 3.425 17.1001 3.125 16.8501 2.875C16.6001 2.625 16.3041 2.5 15.9621 2.5C15.6201 2.5 15.3244 2.625 15.0751 2.875L6.6751 11.3C6.5751 11.4 6.5041 11.5083 6.4621 11.625C6.4201 11.7417 6.39943 11.8667 6.4001 12C6.4001 12.1333 6.4211 12.2583 6.4631 12.375C6.5051 12.4917 6.57576 12.6 6.6751 12.7L15.1001 21.125C15.3334 21.3583 15.6211 21.475 15.9631 21.475C16.3051 21.475 16.6008 21.35 16.8501 21.1Z" fill="black" fill-opacity="0.4"/>
                                </svg>
                            </div>
                            <div className={styles.btn__text}>Все фильмы</div>
                        </div>
                         <div className={styles.movie__top}>
                            <div className={styles.movie__img} >
                                <img src={movie.poster_Link} alt="poster_Link" />
                            </div>
                            <div className={styles.movie__info}>
                                <h2 className={styles.movie__title}>{movie.title}</h2>
                                <div className={styles.short__info}>
                                    <div className={styles.genre}>{"Драма, комедия"}</div>
                                    <div className={styles.country__date}>{"Россия, 2023"}</div>
                                </div>
                                <div className={styles.dates}>
                                    <div className={styles.date__elem}>{"с " + movie.release_Date?.split("-")[2].slice(0,2) + " " + months[+movie.release_Date?.split("-")[1]]}</div>
                                    <div className={styles.date__elem}>{Math.floor(movie.duration / 60) + " ч" + " " + movie.duration % 60 + " м"}</div>
                                </div>

                                <div className="screenings__info__block">
                                    {errorScreening && <h1 style={{textAlign: 'center'}}>Произошла ошибка {errorScreening}</h1>}
                                    <DateList dateList={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                                    <div className={styles.sessions}>
                                        {screeningsBySelecedtDate.map((screening, index) => (
                                            <ScreeningItem key={screening.id} screening={screening} createDataForModal={createDataForModal} cast={movie.cast}  /> 
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={styles.movie__botoom}>
                            <div className={styles.choise__block}>
                                 {
                                    choiseData.map((choise, index) => (
                                        <ChoiseElem key={index} index={index} data={choise} active={index === choiseIndex} changeChoise={changeChoise}/>
                                    ))
                                 }
                            </div>
                            {
                            Object.keys(movie).length 
                            ?
                            MovieData[choiseIndex]
                            : "Загрузка...."
                            }
                        </div>
                    </div>
                </div>
                </section> 
            } 
            <MyModal visible={showModal} setVisible={setShowModal}>
                    <ScreeningInformation data={dataForModal} setShowModal={setShowModal}/>
            </MyModal>
        </> 
    );
}
 
export default MovieIdPage;