import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import TelegramIcon from './footerIconComponent/TelegramIcon';
import VkIcon from './footerIconComponent/VkIcon';


const Footer = () => {
    return ( 
        <footer className={styles.footer}>
            <div className='container'>
                <div className={styles.footer__top}>
                    <div className="width__block">
                        <div className={styles.logo__time__column}>
                            <div className={styles.logo}>
                                <Link href="/">
                                    <img src="/images/logo2.svg" alt="#!" />
                                </Link>
                            </div>
                            <div className={styles.time__block}>
                                <h3 className={styles.time__title}>Время работы</h3>
                                <div className={styles.time__work}>09:00 - 02:00</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="width__block">
                        <nav className={styles.nav}>
                            <h3 className={styles.footer__title}>
                                Меню
                            </h3>
                            <ul className={styles.nav__list}>
                                <li><Link>Афиша</Link></li>
                                <li><Link>Пушкинская карта</Link></li>
                                <li><Link>Новости</Link></li>
                                <li><Link>Акции</Link></li>
                                <li><Link>О кинотеатре</Link></li>
                                <li><Link>Услуги</Link></li>
                            </ul>
                        </nav>
                    </div>
                    
                    <div className="width__block">
                        <div className={styles.contacts}>
                            <h3 className={[styles.footer__title, styles.last].join(' ')}>
                                Контакты
                            </h3>
                            <div className={styles.contact__info}>
                                <div className={styles.adress}>ТРК "Волжский", пр-т М. Горького д. 10 строение 1</div>
                                <div className={styles.email}>mail@volkino.ru</div>
                                <div className={styles.socials}>
                                    <TelegramIcon/>
                                    <VkIcon/>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                    <div className="width__block">
                        <div className={styles.administration__cashier}>
                            <div className={styles.cashier__number}>
                                <h3 className={styles.ac__title}>Касса</h3>
                                <div className={styles.num}>+7 (8352) 23-77-75</div>
                            </div>
                            <div className={styles.administration__number}>
                                <h3 className={styles.ac__title}>Администрация</h3>
                                <div className={styles.num}>+7 (8352) 23-78-50</div>
                            </div>
                        </div>
                    </div>
                    

                </div>
                <div className={styles.footer__bottom}>
                    <h2 className={styles.footer__bottom__text}>© 2023. Все права защищены</h2>
                    <div className={styles.footer__bottom__btn}>
                        <a href='#!' className={styles.download__btn}>
                            <div className={styles.btn__logo__AppStore}>
                                <img src="/images/icons/AppStore.svg" alt="AppStore" />
                            </div>
                            <div className={styles.download__btn__text}>
                                <div className={styles.btn__title}>Загрузите в</div>
                                <div className={styles.btn__name}>App Store</div>
                            </div>
                        </a>
                        <a href='#!' className={styles.download__btn}>
                            <div className={styles.btn__logo__PlayMaket}>
                                <img src="/images/icons/PlayMarket.svg" alt="PlayMarket" />
                            </div>
                            <div className={styles.download__btn__text}>
                                <div className={styles.btn__title}>Доступно в</div>
                                <div className={styles.btn__name}>Google Play</div>
                            </div>
                        </a>
                      
                    </div>
                </div>
            </div>  
        </footer>
    );
}
 
export default Footer;