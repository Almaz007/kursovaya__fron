import axios from 'axios';

export default class SeatService {
    static async getSeatsByAuditoriumId(auditoriumId) {
        return  await axios.get(`http://localhost:5202/api/Seats/all/${auditoriumId}`);
    }
    static async getMaxRow(data) {
        const maxObject = data.reduce((max, obj) => {
            if (obj.row > max.row) {
              return obj;
            } else {
              return max;
            }
        });
        return maxObject.row;
    }
}