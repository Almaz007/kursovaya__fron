import styles from './ShowStep.module.css';

const CurrentStep = ({ step, currentSteps }) => {
    return (
        <div className={styles.pay__steps}>
            {
                currentSteps.map((currentStep, index) => (
                    <div key={index} className={step == index ? [styles.active__step, styles.step].join(" ") : step > index ? [styles.prev__step, styles.step].join(" ") : styles.step}>
                        <div className={styles.step__icon}>
                            {<currentStep.icon styles={styles}/>}
                        </div>
                        <div className={styles.step__text}>{currentStep.text}</div>
                    </div>
                ))
            }
        </div>
    );
}

export default CurrentStep;