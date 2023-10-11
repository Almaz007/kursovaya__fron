import { useState, useEffect } from 'react';

import {useFetching} from '../../hooks/useFetching';

import dateListService from '../../api/dateListService';
import ScreeningService from '../../api/ScreeningService';
import MovieService from '../../api/MovieService'; 

import MyModal from '../UI/myModal/MyModal';
import ScreeningInformation from '../ScreeningInformation/ScreeningInformation';
import DateList from '../UI/dateList/DateList';
import MovieList from './movieList/MovieList';

import styles from './PosterSection.module.css';

const PosterSection = () => {
    

    const [dateList, setdateList] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [screenings, setScreenings] = useState([]);
    const [movies, setMovies] = useState([]);
    
    const [showModal, setShowModal] = useState(false);
    const [dataForModal, setDataForModal] = useState({});

    const [fetchdateList, isdateListLoading, errordateList] = useFetching(async () => {
        let response = await dateListService.getDateList();
        
        let dates = [];
        response.data.forEach(dateItem => {
            dates.push(dateItem.date.split("T")[0]);
        })
        setdateList(dates);
        setSelectedDate(dates[0]);
    })
    const [fetchScreenings, isScreeningLoading, errorScreening] = useFetching(async (date) => {
        let response = await ScreeningService.getScreeningsBySelectedDate(date);
        setScreenings(response.data);
    })


    async function getMoviesScreenings() {
        const uniqueMovieId = [];
        const movies = [];

        screenings.forEach((screening) => {
            if(!uniqueMovieId.includes(screening["movieId"])) {
                uniqueMovieId.push(screening["movieId"]);
            }
        })
        for(let i = 0; i < uniqueMovieId.length; i++) {
            try{
                let result = await MovieService.getMovieById(uniqueMovieId[i])
                result.data["screeningInformation"] = [];
                screenings.forEach(screening => {
                    if(result.data["id"] === screening["movieId"]) {
                        result.data["screeningInformation"].push(screening);
                    }
                })
                movies.push(result.data);
            }
            catch(error) {
                movies.push({"errorMessage": error.message});
            }
        }
        setMovies(movies);
    }
    useEffect(() =>{
        fetchdateList();
    }, [])

    useEffect(() =>{
        if(selectedDate) {
            fetchScreenings(selectedDate);
        }
    }, [selectedDate])

    useEffect(() =>{
        setMovies([]);
        if(screenings.length) {
            getMoviesScreenings();
        }
    }, [screenings])
 
    let openModal = (dataScreening) => {
        setDataForModal(dataScreening);
        setShowModal(true);
    }

    return ( 
        <section className={styles.poster__section}>
            <div className="container">
                <h2 className="section__title">Афиша</h2>

                {errordateList && <h1 style={{textAlign: 'center'}}>Произошла ошибка {errordateList}</h1>}
                <DateList dateList={dateList} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

                <MovieList movies={movies} dateList={dateList} selectedDate={selectedDate} openModal={openModal}/>

                <MyModal visible={showModal} setVisible={setShowModal}>
                    <ScreeningInformation data={dataForModal} setShowModal={setShowModal}/>
                </MyModal>
            </div>
        </section>
     );
}
 
export default PosterSection;