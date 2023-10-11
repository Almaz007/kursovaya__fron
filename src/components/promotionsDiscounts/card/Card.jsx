import styles from './Card.module.css';

const Card = ({card, openModal}) => {
    const {src, card__name, card__description} = card;
    return ( 
        <div className={styles.card} onClick={() => openModal(card)}>
            <div className={styles.card__img__block}>
               <img src={src} alt="cardImg" />
            </div>
            <div className={styles.card__name}>
                {card__name}
            </div>
            <div className={styles.card_description}>
                {card__description}
            </div>
        </div>     
    );
}
 
export default Card;