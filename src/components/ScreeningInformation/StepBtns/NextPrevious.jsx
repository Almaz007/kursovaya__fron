import styles from './stepBtns.module.css';

const NextPrevious = ({setStep, text, actionFunc}) => {
    return (
        <div className={styles.pay__controll}>
            <div className={styles.prev__btn} onClick={() => setStep(prev => prev - 1)}>
                <div className={styles.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M14.0415 17.5834C14.2498 17.375 14.354 17.1284 14.354 16.8434C14.354 16.5584 14.2498 16.312 14.0415 16.1042L7.93734 10L14.0623 3.87504C14.2568 3.6806 14.354 3.43754 14.354 3.14587C14.354 2.85421 14.2498 2.60421 14.0415 2.39587C13.8332 2.18754 13.5865 2.08337 13.3015 2.08337C13.0165 2.08337 12.7701 2.18754 12.5623 2.39587L5.56234 9.41671C5.479 9.50004 5.41984 9.59032 5.38484 9.68754C5.34984 9.78476 5.33261 9.88893 5.33317 10C5.33317 10.1112 5.35067 10.2153 5.38567 10.3125C5.42067 10.4098 5.47956 10.5 5.56234 10.5834L12.5832 17.6042C12.7776 17.7987 13.0173 17.8959 13.3023 17.8959C13.5873 17.8959 13.8337 17.7917 14.0415 17.5834Z" fill="#0030E2"/>
                    </svg>
                </div>
            </div>
            <div className={styles.next__btn} onClick={() => {actionFunc ? actionFunc() : setStep(prev => prev + 1)}}>
                {text}
            </div>
        </div>    
    );
}
 
export default NextPrevious;