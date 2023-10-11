import styles from './SignInForm.module.css';

const SignInForm = () => {
    return ( 
    
        <form className={styles.signInForm} action="">
            <div className={styles.signInBlock}>
                <div className={styles.form__title}>
                    Вход
                </div>
                <div className={styles.form__desc}>
                    Для входа введите ваш номер телефона
                </div>
                <div className={styles.input__block}>
                    <label>Телефон</label>
                    <input id="username" className={styles.signInInput} name="username" placeholder='+7 900 000-00-00' type="text" />
                </div>
            </div>
            <button className={styles.signInButton}>Получить код</button>
            
        </form>
     );
}
 
export default SignInForm;