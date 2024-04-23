import React from 'react';
import styles from './css/app.module.scss';

interface Props {
    onEndStudy: () => void;
}

const StudyTimePage: React.FC<Props> = ({ onEndStudy }) => {
  return (
    <>
      <button className={`${styles.button} ${styles.border_green}`} onClick={onEndStudy}>
        <span className={`${styles.circle} ${styles.green}`} />{"Study on"}
      </button>
      <div className={styles.title}>{"Study Time!"}</div>
    </>
  );
};

export default StudyTimePage;
