import styles from './iconStyles.module.css';

const TelegramIcon = () => {
    return ( 
        <a className={styles.icon__link} href="#!">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={styles.iconFill} d="M29.919 6.16308L25.694 26.0881C25.375 27.4941 24.544 27.8441 23.363 27.1821L16.925 22.4381L13.819 25.4261C13.475 25.7701 13.188 26.0571 12.525 26.0571L12.988 19.5011L24.919 8.72008C25.438 8.25808 24.806 8.00108 24.113 8.46408L9.36301 17.7521L3.01301 15.7641C1.63201 15.3331 1.60701 14.3831 3.30101 13.7201L28.138 4.15109C29.288 3.72009 30.294 4.40608 29.919 6.16308Z" fill="white"/>
            </svg>
        </a>
       
     );
}
 
export default TelegramIcon;