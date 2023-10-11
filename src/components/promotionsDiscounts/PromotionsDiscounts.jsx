import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cards } from './cards.data';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './PromotionsDiscounts.module.css';

import Card from './card/Card';
import MyModal from '../UI/myModal/MyModal';
import NextArrow from '../UI/next-arrow/NextArrow';
import BackArrow from '../UI/back-arrow/BackArrow';



const PromotionsDiscounts = () => {

    const [dataForModal, setDataForModal] = useState({});
    const [showModal, setShowModal] = useState(false);

    let openModal = (dataCard) => {
        setDataForModal(dataCard);
        setShowModal(true);
    }

    return ( 
        <section className={styles.PromotionsDiscountsSection}>
            <div className="container">
                <div className={styles.title__page__pd}>
                     <Link to="/">
                        <h2 className="section__title">Акции и скидки</h2>
                     </Link>
                    <div className={styles.pages}>
                        <button className='gallery__btn-prev' style={{'height': '22px'}}>
                            <BackArrow/>
                        </button>
                        <div className="gallery-pagination" style={{'width': 'unset'}}></div>
                        <button className='gallery__btn-next' style={{"height": "22px"}}>
                            <NextArrow/>
                        </button>
                    </div>
                </div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        550: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        950: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        
                        }}
                    
                    pagination={{
                        el: ".gallery-pagination",
                        type: "fraction"
                    }}
                    navigation={{
                        nextEl: ".gallery__btn-next",
                        prevEl: ".gallery__btn-prev"
                    }}
                    modules={[Pagination, Navigation]}

                    className={["mySwiper", styles.MySwiper].join(' ')}
                >
                    {cards.map((card) => 
                         <SwiperSlide className={styles.SwiperSlide} key={card.id}>
                            <Card card={card} openModal={openModal}/>
                         </SwiperSlide>
                    )}
                </Swiper>
                <MyModal visible={showModal} setVisible={setShowModal}>
                    <div>
                        <h2>{dataForModal.card__name}</h2>
                        <p>{dataForModal.card__description}</p>
                    </div>
                </MyModal>
            </div>
        </section>
    );
}
 
export default PromotionsDiscounts;