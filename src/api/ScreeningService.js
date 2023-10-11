import axios from 'axios';

export default class ScreeningService {
    static async getScreeningsBySelectedDate(date){
        return await axios.get(`http://localhost:5202/api/Screenings/DateTime${date}`);
    }
    static async getScreeningsBySelectedMovieDate(date, movieId){
        return await axios.get(`http://localhost:5202/api/Screenings/DateTime${date}/movieId${movieId}`);
    }
    static async getScreenings(){
        return await axios.get(`http://localhost:5202/api/Screenings`);
    }
}