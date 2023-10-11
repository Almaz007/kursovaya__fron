import { useState, useEffect } from 'react';
import { useFetching } from '../../hooks/useFetching';

import styles from './screeningInformation.module.css';

import SeatService from '../../api/SeatService';
import BookingService from '../../api/BookingService';
import ReservedSeatService from '../../api/ReservedSeatService';
import { getFullDate } from '../../util/convertDate';

import StepSelectSeat from './stepsComponents/StepSelectSeat/StepSelectSeat';
import StepEntryData from './stepsComponents/StepEntryData/StepEntryData';
import StepPayment from './stepsComponents/StepPayment/StepPayment';

import ShowStep from './ShowStep/ShowStep';

import BuyTicket from './StepBtns/BuyTicket';
import NextPrevious from './StepBtns/NextPrevious';
import SelectSeat from './ShowStep/svgElems/SelectSeat';
import EntryData from './ShowStep/svgElems/EntryData'
import Pay from './ShowStep/svgElems/Pay';

import Auditorium from './Auditorium/Auditorium';

const ScreeningInformation = ({data, setShowModal}) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const [seats, setSeats] = useState([]);
    const [step, setStep] = useState(0);
    const [currentData, setCurrentData] = useState({});
    
    const currentSteps = [
        {
            text: 'Выбор места',
            icon: SelectSeat
        },
        {
            text: 'Ввод данных',
            icon: EntryData
        },
        {
            text: 'Оплата',
            icon: Pay
        }
    ]

    const [fetchSeats, isSeatsLoading, errorSeats] = useFetching(async (auditoriumId) => {
        let response = await SeatService.getSeatsByAuditoriumId(auditoriumId);
        let maxRow = await SeatService.getMaxRow(response.data);
        let reservedSeatsData = await ReservedSeatService.getReservedSeatsByScreening(data.id);

        const seatsArray = [];
        console.log(reservedSeatsData);

        response.data.forEach(seat => {
            if(reservedSeatsData.data.find(e => e.seatId === seat.id)) {
                seat["reserved"] = true;
                console.log(seat);
            }
        });
        console.log(response.data);
        for(let row = 1; row <= maxRow; row++) {
            let newArr = []
            response.data.forEach(seat => {
                if(seat.row === row) newArr.push(seat);
            });
            seatsArray.push(newArr);
        }

        setSeats(seatsArray);
    })

    useEffect(() =>{
        if(Object.keys(data).length !== 0 && data.id !== currentData.id){
            fetchSeats(data.auditoriumId);
            
            setSelectedSeats([]);
            setStep(0);
            setCurrentData(data);
        }
    }, [data])

    let addAndDeleteSelectedSeats = (seatData) => {
        if(selectedSeats.find(elem => elem.id === seatData.id)) { 
            setSelectedSeats(selectedSeats.filter(elem => elem.id !== seatData.id));
        }
        else {
            setSelectedSeats(prev => [...prev, seatData]);
        }
    }
    let payment = async () => {
        const dateToday = new Date();
       
        const obj = {
            screeningId: data.id,
            clientId: 1,
            date_Time: getFullDate(dateToday),
            amount_Seat: selectedSeats.length,
            cost: data.cost
        }
        console.log(obj)
        try {
            const createdBooking = await BookingService.createBooking(obj);
            console.log(createdBooking);

            for(let i = 0; i < selectedSeats.length; i++) {
                const newReservedSet = {
                    BookingId: createdBooking.data.id,
                    SeatId: selectedSeats[i].id,
                    screeningId: data.id
                }
                let reservedSeat = await ReservedSeatService.createReservedSeat(newReservedSet);
                console.log(reservedSeat);
            }
        }
        catch(e) {
            console.log("произошла ошибка")
            console.error(e.message)
        }

        setSelectedSeats([]);
        setStep(0);
        setCurrentData({});
        setShowModal(false);
    }
    //комопненты для выбора мест оплаты и т.п
    const stepsComponents =  [
        <StepSelectSeat data={data} addAndDeleteSelectedSeats={addAndDeleteSelectedSeats} selectedSeats={selectedSeats}/>,
        <StepEntryData/>,
        <StepPayment  data={data} selectedSeats={selectedSeats}/>
    ];
    
    //компоненты контроля за шагом они тоже меняются взависимости от шага
    const StepBtns = [
        <BuyTicket setStep={setStep} selectedSeats={selectedSeats} data={data}/>,
        <NextPrevious setStep={setStep} text={"Продолжить"}/>,
        <NextPrevious actionFunc={payment} setStep={setStep} text={"Оплатить"}/>
    ]

    return (
        <div className={styles.screening__information}>
            <div className={styles.payment__steps}>
                {stepsComponents[step]}
                <div className={styles.controll__block}>
                    {StepBtns[step]}
                    {<ShowStep step={step} currentSteps={currentSteps}/>}
                </div>
            </div>
            {errorSeats && <h1 style={{textAlign: 'center'}}>Произошла ошибка {errorSeats}</h1>}
            <Auditorium step={step} data={data} seats={seats}  addAndDeleteSelectedSeats={addAndDeleteSelectedSeats} selectedSeats={selectedSeats}/>
        </div>
    );
}
 
export default ScreeningInformation;