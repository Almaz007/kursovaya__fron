import styles from './MyModal.module.css';

const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [styles.md__overlay];
    if(visible) {
        rootClasses.push(styles.active);
    }
    return ( 
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
                <div className={styles.myModalContent} onClick={(e) => e.stopPropagation()}>
                    {children}
                    <div className={styles.close__modal} onClick={() => setVisible(false)}>
                        <img src="/images/icons/close_modal.svg" alt="" />
                    </div>
                </div>
        </div>
     );
}

export default MyModal;