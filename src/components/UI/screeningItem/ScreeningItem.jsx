import styles from './screeningItem.module.css';

const ScreeningItem = ({screening, createDataForModal}) => {
    return ( 
        <div  className={styles.screening} onClick={() => createDataForModal(screening)} >
            <div className={styles.screening__time}>{screening.screening_start.slice(screening.screening_start.indexOf("T")+1, -3)}</div>
            <div className={styles.screening__price}>{screening.cost + ' р'}</div>
            <div className={styles.screening__quality}>{screening.quality}</div>
        </div>
    );
}
 
export default ScreeningItem;