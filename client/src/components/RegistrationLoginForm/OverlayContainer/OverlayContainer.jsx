import styles from './overlayContainer.module.css';

const OverlayContainer = ({parrentElemStyles, setPanelSwitch}) => {
    return ( 
        <div className={parrentElemStyles.overlay}>
            <div className={[styles.overlay__panel, parrentElemStyles.overlay__left].join(" ")}>
                <h1>С возвращением!</h1>
                <p className={styles.overlay__text}>Чтобы оставаться на связи с нами, пожалуйста, войдите, используя свои личные данные.</p>
                <button className={styles.ghost} onClick={() => setPanelSwitch(false)} id="login">Войти</button>
            </div>
            <div className={[styles.overlay__panel, parrentElemStyles.overlay__right].join(" ")}>
                <h1>Привет, Друг!</h1>
                <p className={styles.overlay__text}>Введите свои личные данные и начните путешествие вместе с нами</p>
                <button className={styles.ghost} onClick={() => setPanelSwitch(true)} id="registration">Зарегистрироваться</button>
            </div>
      </div>
    );
}

export default OverlayContainer;