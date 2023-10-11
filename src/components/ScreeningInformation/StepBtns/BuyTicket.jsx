import styles from './stepBtns.module.css';

const BuyTicket = ({setStep, selectedSeats, data}) => {
    return (
        <div className={selectedSeats.length !== 0 ? styles.pay__controll : [styles.no__active, styles.pay__controll].join(" ")}>
            <div className={styles.pay__btn} onClick={() => {setStep(prev =>  prev + 1)}}>Купить билет</div>
            <div className={styles.result__cost__info}>
                <div className={styles.result__cost__text}>Итого</div>
                <div className={styles.result__cost}>{(selectedSeats.length * data.cost) + " ₽"}</div>
            </div>
        </div>    
    );
}
 
export default BuyTicket;