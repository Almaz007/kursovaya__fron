import axios from 'axios';

export default class ReservedSeatService {
    static async getReservedSeatsByScreening(ScreeningId) {
        return await axios.get(`http://localhost:5202/api/Reserved_seat/ScreeningId${ScreeningId}`)
    }

    static async createReservedSeat({BookingId, SeatId, screeningId}) {
        return await axios({
            method: 'post',
            url: "http://localhost:5202/api/Reserved_seat",
            data: {
                BookingId,
                SeatId,
                screeningId
            }
          });
    }
}