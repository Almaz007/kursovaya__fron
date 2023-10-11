import {useState} from 'react';
import { Link } from 'react-router-dom';

import Navigation from './navigation/Navigation';
import MyButton from '../button/MyButton'
import MyModal from '../myModal/MyModal';
import SignInForm from "../../signInForm/SignInForm";

import styles from './Header.module.css';

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const [showNav, setShowNav] = useState(false);

    return ( 
        <header>
            <div className='container'>
                <div className={styles.header__block}>
                    <div className={styles.header__info}>
                        <div className={styles.header__logo}>
                            <Link to="/">
                                <img src="/images/logo.svg" alt="logo" />
                            </Link> 
                        </div>
                        <div className={styles.header__text}>
                            <div className={styles.text__block}>
                                <div className={styles.info__city}>Чебоксары</div>
                                <div className={styles.info__adress}>
                                    ТРК "Волжский", пр-т М. Горького д. 10 строение 1
                                </div>
                            </div>
                            <div className={styles.number__block}>
                                 8 (835) 260-66-01
                            </div>
                        </div>
                    </div>
                    <div className={styles.header__action}>
                        <Navigation showNav={showNav} setShowNav={setShowNav}/>
                        <MyButton onClick={() => setShowModal(true)}>Войти</MyButton>
                        <MyModal visible={showModal} setVisible={setShowModal}>
                            <SignInForm/>
                        </MyModal>
                    </div>
                </div>
            </div>
        </header>
     );
}
 
export default Header;