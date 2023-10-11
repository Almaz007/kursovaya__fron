import styles from './auditorium.module.css';

const Auditorium = ({step, data, seats, selectedSeats, addAndDeleteSelectedSeats}) => {
    return ( 
        <div className={step > 0 ? [styles.no__active, styles.auditorium__data].join(" ") : styles.auditorium__data}>
            <h2 className={styles.auditorium__title}>{"Зал " + data.auditoriumId}</h2>
            <div className={styles.movie_screen}>
                <img src="/images/movie_screen.svg" alt="screen" />
            </div>
            <div className={styles.seats}>
                {
                    seats 
                    ? 
                    seats.map((seatsRow, index) => (
                        <div key={index} className={styles.seats__row}>
                            <div className={styles.numRow}>{index + 1}</div>
                            {
                                seatsRow.map(seat => (
                                    seat.reserved 
                                    ? 
                                    <div key={seat.id} className={[styles.reservedSeat, styles.seat].join(" ")}>
                                        {seat.number}
                                    </div>
                                    :
                                    <div key={seat.id} className={selectedSeats.find(e => e.id === seat.id) ? [styles.selected, styles.seat].join(" ") :  styles.seat} onClick={() => {addAndDeleteSelectedSeats(seat)}}>
                                        {seat.number}
                                    </div>
                                ))
                            }
                            <div className={styles.numRow}>{index + 1}</div>
                        </div>
                    ))
                    :"Загрузка...."
                }
            </div>
            <div className={styles.auditorium__information}>
                    <div className={styles.auditorium__information__item}>
                        <div className={[styles.color__block, styles.color1].join(' ')}></div>
                        <div className={styles.your__choise__text}>Ваш выбор</div>
                    </div>
                    <div className={styles.auditorium__information__item}>
                        <div className={[styles.color__block, styles.color2].join(' ')}></div>
                        <div className={styles.seat__price__text}>{data.cost + " ₽"}</div>
                    </div>
                    <div className={styles.auditorium__information__item}>
                        <div className={[styles.color__block, styles.color3].join(" ")}></div> 
                        <div className={styles.selected__seat__text}>Занято</div>
                    </div>

                    <div className={styles.clarification}>Цена указана за один билет</div>
            </div>
        </div>
    );
}
 
export default Auditorium;