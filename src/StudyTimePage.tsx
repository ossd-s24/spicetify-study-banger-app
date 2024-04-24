import React from 'react';
import styles from './css/app.module.scss';

interface Props {
    onEndStudy: () => void;
}

const StudyTimePage: React.FC<Props> = ({onEndStudy, onChangeTheme}) => {
    return (
        <>
            <button className={`${styles.button} ${styles.border_green}`} onClick={onEndStudy}>
                <span className={`${styles.circle} ${styles.green}`} />{"Study on"}
            </button>
            <button className={`${styles.button} ${styles.border_green}`} onClick={onChangeTheme}>
                <span className={`${styles.circle} ${styles.green}`} />{"Change theme"}
            </button>
            <div className={styles.title}>{"Study Time!"}</div>
        </>
    );
};

export default StudyTimePage;
