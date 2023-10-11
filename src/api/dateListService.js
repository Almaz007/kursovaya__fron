import axios from 'axios';

export default class dateListService {
    static async getDateList() {
        return await axios.get( "http://localhost:5202/api/Weekly_calendar");
    }
}