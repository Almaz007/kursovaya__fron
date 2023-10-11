import styles from './stepSelectSeat.module.css';

const StepSelectSeat = ({data, addAndDeleteSelectedSeats, selectedSeats}) => {
    return ( 
        <div className={styles.step_select__seat}>
                    <div className={styles.movie__data}>
                        <h2 className={styles.title}>
                            {data.title}
                        </h2>
                        <div className={styles.duration__block}>
                            <div className={styles.duration__text}>Длительность</div>
                            <div className={styles.duration}>{data.duration + " м"}</div>
                        </div>
                        <div className={styles.movie__subData}>
                            <div className={styles.subData__elem}>{data.rating}</div>
                            <div className={styles.subData__elem}>{data.quality}</div>
                            <div className={styles.subData__elem}>{"Зал " + data.auditoriumId}</div>
                        </div>
                    </div>
                    <div className={styles.selected__seats}>
                        <h3 className={styles.selected__seats__title}>Выбранные места</h3>
                        {selectedSeats.map((seat, index) => (
                            <div key={index} className={styles.selected__seat}>
                                <div className={styles.selected__seat__info}>
                                    <div className={styles.seat__info}>{seat.row + " ряд, " + seat.number + " место"}</div>
                                    <div className={styles.price__info}>{data.cost + " ₽"}</div>
                                </div>
                                <div className={styles.seat_delete__img} onClick={() => {addAndDeleteSelectedSeats(seat)}}>
                                    <img  src="/images/icons/deleteSeat.svg" alt="deleteSeat" />
                                </div>
                            </div>  
                        ))}
                    </div>
        </div>
    );
}
 
export default StepSelectSeat;