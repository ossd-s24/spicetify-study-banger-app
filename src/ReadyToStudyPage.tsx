import React from 'react';
import styles from './css/app.module.scss';

interface Props {
    onStartStudy: () => void;
}

const ReadyToStudyPage: React.FC<Props> = ({ onStartStudy }) => {
    return (
        <>
            <div className={styles.hero}>
                <button className={`${styles.button} ${styles.border_red}`} onClick={onStartStudy}>
                    <span className={`${styles.circle} ${styles.red}`} />{"Study Off"}
                </button>
                <div className={styles.loadingTitle}>{"Are You Ready to Study?"}</div>
            </div>
            <div className={styles.loadingContainer}>

                <div className={styles.book}>
                    <span className={styles.bookcover}></span>
                    <span className={`${styles.flip} ${styles.bookpage}`}></span>
                    <span className={`${styles.flip} ${styles.bookpage}`}></span>
                    <span className={styles.bookpage}></span>
                    <span className={`${styles.bookcover} ${styles.flip}`}></span>
                </div>

                <div className={styles.motivation}>{"Time to Hit the Books!"}</div>
            </div>
        </>
    );
};

export default ReadyToStudyPage;
