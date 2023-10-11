import axios from 'axios';

export default class MovieService {
    static async getMovieById(movieId) {
        return  await axios.get(`http://localhost:5202/api/Movies/${movieId}`);
    }
}