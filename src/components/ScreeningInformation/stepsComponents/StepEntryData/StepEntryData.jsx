import {useState} from 'react';

import styles from './stepEntryData.module.css';

const StepEntryData = () => {
    
    const [choiseState, setChoiseState] = useState(1);
    const changeChoiseState = (num) => {
        if (num !== choiseState) {
            setChoiseState(num);
        }
    }

    return ( 
        <div className={styles.entry_data__block}>
            <h2 className={styles.title}>Ввод данных</h2>
            <div className={styles.payment__method}>
                <div className={styles.method} onClick={() => {changeChoiseState(1)}}>
                    <div className={styles.method__text}>Быстрая оплата</div>
                    <div className={styles.check__box}>
                        {
                            choiseState == 1 ? <img src="/images/icons/checkmark.svg" alt="#" /> : ''
                        }
                    </div>
                </div>
                <div className={styles.method} onClick={() => {changeChoiseState(2)}}>
                    <div className={styles.method__text}>Войти или зарегистрироватсья</div>
                    <div className={styles.check__box}>
                        {
                            choiseState == 2 ? <img src="/images/icons/checkmark.svg" alt="#" /> : ''
                        }
                    </div>
                </div>
            </div>
            <div className={styles.entry__data}>
                <h2 className={styles.entry__data__title}>Введите данные</h2>
                <form action="">
                   <div className={styles.form__group}>
                        <input id='myInput' className={styles.input}type="text" placeholder='vol2123@gmail.com'/>
                        <label className={styles.input__label} htmlFor="myInput">Почта</label>
                   </div>
                   <div className={styles.form__group}>
                        <input id='myInput' className={styles.input} type="text" placeholder='+7 900 000-00-00'/>
                        <label className={styles.input__label} htmlFor="myInput">Номер телефона</label>
                   </div>
                </form>
            </div>
        </div>
    );
}
 
export default StepEntryData;