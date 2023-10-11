import axios from 'axios';

export default class BookingService {
    static async createBooking({screeningId, clientId, date_Time, amount_Seat, cost}) {
        // return await axios.post( "http://localhost:5202/api/Bookings", {
        //     params: {
        //         screeningId, clientId, date_Time, amount_Seat, cast
        //     }
        // });

        return await axios({
            method: 'post',
            url: "http://localhost:5202/api/Bookings",
            data: {
                screeningId,
                clientId,
                date_Time,
                amount_Seat,
                cost
            }
          });
    }
}