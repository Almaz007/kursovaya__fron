import {useState} from 'react';

import styles from './stepPayment.module.css'

const StepPayment = ({data, selectedSeats}) => {

    const [choiseState, setChoiseState] = useState(1);
    const changeChoiseState = (num) => {
        if (num !== choiseState) {
            setChoiseState(num);
        }
    }

    return ( 
        <div className={styles.payment__block}>
            <h2 className={styles.title}>Оплата</h2>
            <div className={styles.means__payment}>
                <div className={styles.means} onClick={() => {changeChoiseState(1)}}>
                    <div className={styles.icon__text__block}>
                        <div className={styles.means__icon}>
                            <img src="/images/icons/bank.svg" alt="bank_icon" />
                        </div>
                        <div className={styles.means__text}>Банковская карта</div>
                    </div>
                    
                    <div className={styles.check__box}>
                        {
                            choiseState == 1 ? <img src="/images/icons/checkmark.svg" alt="#" /> : ''
                        }
                    </div>
                </div>
                <div className={styles.means} onClick={() => {changeChoiseState(2)}}>
                     <div className={styles.icon__text__block}>
                        <div className={styles.means__icon}>
                            <img src="/images/icons/Puskinskaya.svg" alt="Pushkinskaya" />
                        </div>
                        <div className={styles.means__text}>Пушкинская карта</div>
                    </div>
                    <div className={styles.check__box}>
                        {
                            choiseState == 2 ? <img src="/images/icons/checkmark.svg" alt="#" /> : ''
                        }
                    </div>
                </div>
            </div>
            <div className={styles.selected__seats}>
                        <h3 className={styles.selected__seats__title}>Детали заказа</h3>
                        {selectedSeats.map((seat, index) => (
                            <div key={index} className={styles.selected__seat}>
                                <div className={styles.selected__seat__info}>
                                    <div className={styles.seat__info}>{seat.row + " ряд, " + seat.number + " место"}</div>
                                </div>
                                <div className={styles.seat_price}>
                                    {data.cost + " ₽"}
                                </div>
                            </div>  
                        ))}
                    </div>
        </div>
    );
}
 
export default StepPayment;