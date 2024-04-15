import React from 'react';
import styles from './css/app.module.scss';

interface Props {
    onStartStudy: () => void;
}

const ReadyToStudyPage: React.FC<Props> = ({onStartStudy}) => {
    return (
        <>  
            <div className={styles.background_image}>
                <button className={`${styles.button} ${styles.border_red}`} onClick={onStartStudy}>
                    <span className={`${styles.circle} ${styles.red}`} />{"Study Off"}
                </button>
                <div className={styles.title}>{"Are You Ready to Study?"}</div>
            </div>
        </>
    );
};

export default ReadyToStudyPage;
