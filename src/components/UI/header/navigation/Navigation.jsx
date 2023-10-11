import { Link } from "react-router-dom";

import styles from './Navigation.module.css';



const Navigation = ({showNav, setShowNav}) => {
    const navClasses = [styles.navigation];

    if(showNav) {
        navClasses.push(styles.open)
    }
    
    return ( 
       <nav className={navClasses.join(' ')}>
            <ul className={styles.nav__list}>
                <li className={styles.active}>
                    <Link to="/Poster" onClick={() => setShowNav(!showNav)}>Афиша</Link>
                </li>
                <li>
                    <Link to="/" onClick={() => setShowNav(!showNav)}>Пушкинская карта</Link>
                </li>
                <li>
                    <Link to="/" onClick={() => setShowNav(!showNav)}>Акции</Link>
                </li>
                <li>
                    <Link to="/" onClick={() => setShowNav(!showNav)}>Услуги</Link>
                </li>
            </ul>
            <button className={styles.navigation__burger__btn} onClick={() => setShowNav(!showNav)}>
                <span></span><span></span><span></span>
            </button>
       </nav>
     );
}
 
export default Navigation;